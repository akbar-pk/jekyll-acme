
$.when(
    $.getScript('/js/grapes/gjsPanels.js'),
    $.getScript('/js/grapes/gjsBlocks.js'),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#components-container',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '800px',
    width: '100%',
    
    // Disable the storage manager for the moment
    storageManager: { type: null },
    // Avoid any default panel
    panels: eteachPanels,
    canvas: {
        styles: [
            '../../css/style.css',
          '../../css/careers.css',          
          '../../css/slick.css',
        ],
        scripts: [
           '../..//js/jquery.min.js',            
            '../../js/slick.min.js',
            '../js/page.js'
        ]        
    },    
    blockManager: {
        appendTo: '#page-blocks',
        blocks: eteachBlocks
      },
      layerManager: {
        appendTo: '#layers-container'
      },
      // We define a default panel as a sidebar to contain layers
    //   panels: {
    //     defaults: [{
    //       id: 'layers',
    //       el: '.panel__right',
    //       // Make the panel resizable
    //       resizable: {
    //         maxDim: 350,
    //         minDim: 200,
    //         tc: 0, // Top handler
    //         cl: 1, // Left handler
    //         cr: 0, // Right handler
    //         bc: 0, // Bottom handler
    //         // Being a flex child we need to change `flex-basis` property
    //         // instead of the `width` (default)
    //         keyWidth: 'flex-basis',
    //       },
    //     }]
    // },
    styleManager : {
        appendTo: '#styles-container',
        sectors: 
        [
            // {
            // name: 'Dimension',
            // buildProps: ['width', 'min-height']
            // },
            {
                name: 'Colors',
                buildProps: ['color', 'background-color'],
                open: false,
            },
            {
                name: 'Shadows',
                buildProps: ['box-shadow', 'text-shadow'],
                open: false,
            },
            {
                name: 'Fonts',
                buildProps: ['font-size', 'font-family'],
                open: false,
            }, 
            {
                name: 'Spacing',
                buildProps: ['margin', 'padding'],
                open: false,
            },
            {
                name: 'Borders',                
                buildProps: [                                      
                    'border'                   
                ],
                open: false,
            },

        ]
    },      
  });

  var blockManager = editor.BlockManager;
  blockManager.add('my-map-block', {
    label: `<h6>Map</h6>                
    <div class="block-display">
        <i class="fa fa-map-marker fa-5" aria-hidden="true"></i>
    </div>`,
    content: {
      type: 'map', // Built-in 'map' component
      style: {
        height: '400px'
      },
      removable: false, // Once inserted it can't be removed
    }
  });
  //editor.Panels.addPanel(eteachPanels);
//   editor.Panels.addPanel({
//     id: 'panel-top',
//     el: '.panel__top',
//   });
//   editor.Panels.addPanel({
//     id: 'basic-actions',
//     el: '.panel__basic-actions',
//     buttons: [
//       {
//         id: 'visibility',
//         active: true, // active by default
//         className: 'btn-toggle-borders hide',
//         label: '<u>B</u>',
//         command: 'sw-visibility', // Built-in command
//       }, {
//         id: 'export',
//         className: 'btn-open-export',
//         label: 'Exp',
//         command: 'export-template',
//         context: 'export-template', // For grouping context of buttons from the same panel
//       }, {
//         id: 'show-json',
//         className: 'btn-show-json',
//         label: 'JSON',
//         context: 'show-json',
//         command(editor) {
//           editor.Modal.setTitle('Components JSON')
//             .setContent(`<textarea style="width:100%; height: 250px;">
//               ${JSON.stringify(editor.getComponents())}
//             </textarea>`)
//             .open();
//         },
//       }
//     ],
//   });




});
