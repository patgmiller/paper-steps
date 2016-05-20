var el, form, i, item, items, _items, len, steps, step;

suite('<paper-step>', function() {

  setup(function() {
    step = fixture('paper-step-fixture');
  });

  test('default step is 1', function() {
    assert.equal(step.step, 1);
  });

});

suite('<paper-steps> properties and defaults', function() {

  setup(function() {
    el = item = null;
    i = len = 0;
    steps = fixture('paper-steps-fixture');
    items = steps.$.steps_content.items;
    _items = steps.$.selector.$$('template').items; //horizontal
  });

  test('defaults to horizontal display.', function() {
    assert.equal(steps._vertical, false);
    assert.equal(steps._horizontal, true);
    assert.equal(steps._cssClass, 'horizontal');
  });

  test('paper-step defines the "label" property.', function() {
    assert.equal(items[0].label, 'step 1');
    assert.equal(items[1].label, 'step 2');
    assert.equal(items[2].label, '');
  });

  test('default steps are: 1, 2, and 3.', function() {
    assert.equal(items[0].step, 1);
    assert.equal(items[1].step, 2);
    assert.equal(items[2].step, 3);
  });

  test('paper-step adds first/last optional/required classes.', function() {
    for (i=0, item, len=items.length; i<len; i++) {
      item = items[i];
      el = item.$.step_content;

      switch (i) {
        case 0:
          assert.equal(item._cssClass, 'optional-step first ');
          assert.isTrue(el.classList.contains('first'));
          assert.isTrue(el.classList.contains('optional-step'));
          assert.isFalse(el.classList.contains('last'));
          assert.isFalse(el.classList.contains('required-step'));
          break;
        case 1:
          assert.equal(item._cssClass, 'required-step ');
          assert.isTrue(el.classList.contains('required-step'));
          assert.isFalse(el.classList.contains('first'));
          assert.isFalse(el.classList.contains('last'));
          assert.isFalse(el.classList.contains('optional-step'));
          break;
        case 2:
          assert.equal(item._cssClass, 'required-step last ');
          assert.isTrue(el.classList.contains('last'));
          assert.isTrue(el.classList.contains('required-step'));
          assert.isFalse(el.classList.contains('first'));
          assert.isFalse(el.classList.contains('optional-step'));
          break;
      }
    }
  });

  test('paper-step can be editable, optional, and selectable.', function() {
    var
      editable = [true, false, false],
      optional = [true, false, false],
      selectable = [true, true, true]
    ;

    //editable
    for (i=0, item, len=items.length; i<len; i++) {
      item = editable[i];
      assert.equal(items[i].editable, item);
      assert.equal(_items[i].editable, item);
    }

    //selectable
    for (i=0, item, len=items.length; i<len; i++) {
      item = selectable[i];
      assert.equal(items[i].selectable, item);
      assert.equal(_items[i].selectable, item);
    }

    //optional
    for (i=0, item, len=items.length; i<len; i++) {
      item = optional[i];
      assert.equal(items[i].optional, item);
      assert.equal(_items[i].optional, item);
    }
  });

  test('paper-steps[linear] progression.', function() {
    var selector = steps.$.selector;
    for(i=1, len=items.length; i<len; i++) {
      selector.select(i);
      expect(selector.selected).to.not.equal(0);
    }

    steps.linear = false;
    for(i=1, len=items.length; i<len; i++) {
      selector.select(i);
      expect(selector.selected).to.equal(i);
    }
  });
});

suite('<paper-steps> events', function() {

  setup(function() {
    el = item = form = null;
    i = len = 0;
    steps = fixture('paper-steps-fixture');
    items = steps.$.steps_content.items;
    _items = steps.$.selector.$$('template').items; //horizontal
    form = items[0].$.step_content.querySelector('form[is="iron-form"]');
  });

  test('paper-step is complete after skip pressed.', function() {
    item = items[0];
    //initially undefined
    expect(item.lastErrorResponse).to.be.undefined;
    expect(item.lastSuccessResponse).to.be.undefined;

    item.$.skip.click();
    //event is debounced, so wait 300ms.
    item.async(function() {
      assert.equal(item.completed, true);
      expect(item.data).to.be.equal({});
      expect(item.lastErrorResponse).to.be.undefined;
      expect(item.lastSuccessResponse).to.be.undefined;
    }, 300);
  });

  test('paper-step is complete after continue pressed.', function() {
    item = items[0];
    //initially undefined
    expect(item.lastErrorResponse).to.be.undefined;
    expect(item.lastSuccessResponse).to.be.undefined;

    item.$.continue.click();
    //event is debounced, so wait 300ms.
    item.async(function() {
      assert.equal(item.completed, true);
      expect(item.data).to.be.equal(item._getForm().serialize());
      expect(item.lastErrorResponse).to.be.undefined;
      expect(item.lastSuccessResponse).to.be.not.ok;
    }, 300);
  });

  test('paper-button continue is disabled / re-enabled on submit.', function() {
    item = items[0];
    item.$.continue.click();

    //non-deterministic method of testing disabled state
    // item.async(function() {
    //   assert.equal(item.$.continue.disabled, true);
    // }, 50);

    //event is debounced, so wait 300ms.
    item.async(function() {
      assert.equal(item.$.continue.disabled, false);
    }, 300);
  });

  test('paper-button only triggers one event: submit, reset, skip.', function() {
    item = items[0];

    //trigger reset click event 100's
    sinon.spy(form, "reset");
    for (i=0, len=100; i<len; i++) {
      item.$.reset.click();
    }
    item.async(function() {
      assert(form.reset.calledOnce);
    }, 400);
    form.reset.restore(); //unwrap

    //trigger submit click event 100's
    sinon.spy(form, "submit");
    for (i=0, len=100; i<len; i++) {
      item.$.continue.click();
    }
    item.async(function() {
      assert(form.submit.calledOnce);
    }, 400);
    form.submit.restore(); //unwrap

    //trigger skip click event 100's
    sinon.spy(form, "reset");
    for (i=0, len=100; i<len; i++) {
      item.$.skip.click();
    }
    item.async(function() {
      assert(form.reset.calledOnce);
    }, 400);
    form.reset.restore(); //unwrap
  });

});

suite('<paper-steps> editable', function() {
  setup(function() {
    el = item = form = null;
    i = len = 0;
    steps = fixture('paper-steps-fixture-editable');
    items = steps.$.steps_content.items;
    form = items[0].$.step_content.querySelector('form[is="iron-form"]');
  });

  test('<paper-step> state can be editable, optional, and selectable', function() {
    //steps: optional (1st) -> editable (2nd)-> [standard] (3rd)

    // skip 1st step, non-editable (non-selectable)
    item = items[0];
    assert.equal(item.selectable, true);
    item.$.skip.click(); //skip this step
    item.async(function() {
      assert.equal(this.selectable, false);
      steps.$.steps_content.select(item);
      assert.equal(steps.$.steps_content.selected, 1);
    }, 100);

    // submit 2nd step, editable (selectable)
    item = items[1];
    assert.equal(item.editable, true);
    assert.equal(item.selectable, true);
    item.$.continue.click(); //submit this step
    item.async(function() {
      assert.equal(this.selectable, true);
      steps.$.steps_content.select(item);
      assert.equal(steps.$.steps_content.selected, 1);
    }, 100);
  });

});

suite('<paper-steps> initial-steps', function() {

  setup(function() {
    el = item = form = null;
    i = len = 0;
    steps = fixture('paper-steps-fixture-initial-step');
    items = steps.$.steps_content.items;
  });

  test('<paper-steps> begins on step #3', function() {
    var
      _steps = steps
    ;

    // listen for ready event
    steps.listen(_steps, 'paper-steps-ready', function(e) {
      assert.equal(this.initializing, false);
      assert.equal(this.$.steps_content.selected, 2);
      assert.equal(this, e.detail);

      for (i=0, len=2; i<len; i++) {
        assert.equal(items[i].completed, true);
      }
    });

    // wait delay for initialization to finish
    steps.async(function() {
      assert.equal(_steps.initializing, false);
      assert.equal(_steps.steps.$.steps_content.selected, 2);
    }, 300);
  });

});
