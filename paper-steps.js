'use strict';
Polymer({
  is: 'paper-steps',
  properties: {
    /**
     * Computed css class based on `_vertical` property.
     */
    _cssClass: {
      type: String,
      computed: '__cssClass(_vertical)'
    },
    /**
     * Computed boolean property based on `_vertical`, used for convenience.
     */
    _horizontal: {
      type: Boolean,
      computed: '__horizontal(_vertical)'
    },
    /**
     * If true, the `paper-steps` element is doing a little setup , please
     * wait until done.
     */
    _initializing: {
      type: Boolean,
      value: true
    },
    /**
     * Index of the currently selected `paper-step` element.
     */
    _selected: {
      type: Number,
      notify: true,
      value: 0
    },
    /**
     * Reference to the array of `paper-step` elements.
     */
    _steps: {
      type: Array
    },
    /**
     * Computed property with the total number of items in `_steps`.
     */
    _total: {
      type: Number,
      computed: '__total(_steps)'
    },
    /**
     * Determines if the `paper-steps` element is displayed vertically or
     * horizontally.
     */
    _vertical: {
      type: Boolean,
      value: false,
    },
    /**
     * If true, all of the submit buttons which are automatically
     * added for each `paper-step` element will be hidden.
     */
    actionsDisabled: {
      type: Boolean,
      value: false
    },
    /**
     * If set, and is within the valid range of selectable `paper-step`
     * elements, `paper-steps` will use this value as the beginning step.
     * `paper-steps` will also setp all previous steps to `complete` if
     * the form inputs are valid.
     *
     * Useful for saving progress and returning to it later, then jumping
     * immediately to this initial step value (Note: Zero based index of
     * step).
     */
    initialStep: {
      type: Number
    },
    /**
     * If true, requires the steps to be completed in ascending numerical order.
     * If false, the steps may be completed out of order.
     */
    linear: {
      type: Boolean,
      value: false
    },
    /**
     * Determines how the `paper-steps` element is displayed.
     * true: always display in vertical mode
     * false: display in horizontal mode if the screen is wide enough,
     *        otherwise display in vertical mode
     */
    vertical: {
      type: Boolean,
      value: false
    }
  },
  listeners: {
    'iron-activate': '_onActivate',
    'iron-deselect': '_onDeselect',
    'iron-select': '_onSelect',
    'iron-resize': '_onIronResize',
    'paper-step-next': '_onNext',
    'paper-step-complete': '_onComplete'
  },
  behaviors: [
    Polymer.IronResizableBehavior,
  ],

  // Element Lifecycle
  ready: function() {},

  attached: function() {
    var
      el, ruler,
      that = this
    ;

    this.async(function() {
      ruler = that.create('iron-selector', {id: 'ruler'});
      that.$.selector.getEffectiveChildren().forEach(
        function(s, index) {
          if (s.nodeName.toLowerCase() == 'paper-step') {
            //exclude any template or other elements.
            el = ruler.create('paper-step', {
              label: s.label,
              optional: s.optional,
              step: s.step,
              steps: s.steps,
              completed: s.completed,
              editable: s.editable,
              duplicate: true
            });
            Polymer.dom(ruler).appendChild(el);
          }
        }, this
      );

      Polymer.dom(that.root).appendChild(ruler);
      ruler.setAttribute('class', 'horizontal ' + ruler.getAttribute('class'));
      that.notifyResize, 1
      //trigger an initial update
      that._updateVertical();
    }, 250);
  },

  detached: function() {},

  // Element Behavior
  /**
   *
   */
  __cssClass: function(_vertical) {
    return (_vertical) ? 'vertical' : 'horizontal';
  },
  /**
   *
   */
  __horizontal: function(_vertical) {
    return !_vertical;
  },
  /**
   *
   */
  __total: function(steps) {
    var
      i, items, steps = steps && steps.length || 1,
      that = this
    ;
    items = this.$.steps_content.items;
    if (steps && items.length === steps && this.actionsDisabled) {
      for (i=0; i < steps; i++) {
        items[i].actionsDisabled = true;
      }
    }

    // Set initial step if assigned and value < total
    // Set any previous valid steps as completed.
    this.debounce('paper-steps-initialize', function() {
      var
        item, form,
        initial = parseInt(that.initialStep)
      ;

      if (initial !== NaN && initial < that._total) {
        initial = Math.max(initial, 0);

        for (i=0; i<initial; i++) {
          item = items[i];
          try {
            form = item._getForm();
            if (form && form.validate()) {
              item.completed = true;
            }
          } catch (e) {
            console.log('paper-steps-initialize error', e, typeof(form));
          }
        }
        that.$.steps_content.selected = initial;
      }
      that._initializing = false;
      that.fire('paper-steps-ready', that);
    }, 250);

    return steps;
  },
  /**
   *
   */
  _onActivate: function(e) {
    var
      item = e.detail && e.detail.item,
      selectable = item && item.selectable,
      selector = this.$.selector,
      items = selector && selector.items,
      previous = selector && item.step > 1 && items[selector.indexOf(item)-1],
      stop = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
      }
    ;

    //if item is not selectable, disable click / touch event.
    if (selectable !== true) {
      return stop(e);

    } else if (this.linear) {
      //if linear, not first and previous item must be completed before advancing
      if (previous && previous.completed !== true) {
        return stop(e);
      }
    }
  },
  /**
   *
   */
  _onComplete: function(e) {
    this.$.selector.items[parseInt(e.detail) - 1].completed = true;
  },
  /**
   *
   */
  _onDeselect: function(e) {
    e.detail.item._selected = false;
  },
  /**
   *
   */
  _onNext: function(e) {
    if (this._initializing != true) {
      this.$.steps_content.selectNext();
    }
  },
  /**
   *
   */
  _onSelect: function(e) {
    e.detail.item._selected = true;
  },
  /**
   *
   */
  _onIronResize: function() {
    this._updateVertical();
  },
  /**
   *
   */
  _updateVertical: function() {
    if (this.vertical) {
      this._vertical = true;
    }
    else {
      //catch first few calls, iron-resize gets called initially
      //before ruler is ready.
      var ruler = this.querySelector('#ruler');
      if (ruler) {
        this._vertical = ruler.scrollWidth > ruler.offsetWidth;
      }
    }
  },
});
