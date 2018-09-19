var crc = 'create-comp';
var mvc = 'move-comp';
var swv = 'sw-visibility';
var expt = 'export-template';
var osm = 'open-sm';
var otm = 'open-tm';
var ola = 'open-layers';
var obl = 'open-blocks';
var ful = 'fullscreen';
var prv = 'preview';

var eteachPanels = {
  defaults: [
    {
      id: 'options',
      buttons: [
        {
          active: true,
          id: swv,
          className: 'fa fa-square-o',
          command: swv,
          context: swv,
          attributes: { title: 'View components' }
        },
        {
          id: prv,
          className: 'fa fa-eye',
          command: prv,
          context: prv,
          attributes: { title: 'Preview' }
        },
        {
          id: ful,
          className: 'fa fa-arrows-alt',
          command: ful,
          context: ful,
          attributes: { title: 'Fullscreen' }
        },
        {
          id: 'undo',
          className: 'fa fa-undo icon-undo',
          command: 'undo',
          attributes: { title: 'Undo (CTRL/CMD + Z)'}
        },{
          id: 'redo',
          className: 'fa fa-repeat icon-redo',
          command: 'redo',
          attributes: { title: 'Redo (CTRL/CMD + SHIFT + Z)' }
        },
        {
          id: 'clean-all',
          className: 'fa fa-trash icon-blank',
          command: 'clean-all',
          attributes: { title: 'Empty canvas' }
        }
      ]
    },
    {
      id: 'views',
       buttons: [
        {
            id: osm,
            className: 'fa fa-paint-brush hide',
            command: osm,
            active: true,
            attributes: { title: 'Open Style Manager' }
        },
        // {
        //   id: otm,
        //   className: 'fa fa-cog',
        //   command: otm,
        //   attributes: { title: 'Settings' }
        // },
        // {
        //   id: ola,
        //   className: 'fa fa-bars',
        //   command: ola,
        //   attributes: { title: 'Open Layer Manager' }
        // },
        // {
        //   id: obl,
        //   className: 'fa fa-th-large',
        //   command: obl,
        //   attributes: { title: 'Open Blocks' }
        // },
        // {
        //   id: 'open-code',
        //   className: 'fa fa-code',
        //   command: 'open-code',
        //   attributes: { title: 'Open Code' }
        // }
      ]
    }
  ]
}
