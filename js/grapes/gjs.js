const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#components-container',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: windowHeight+'px',
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

editor.on('component:add', (model) => {
	console.log('Edited');
});

const um = editor.UndoManager;
const stack = um.getStack();

$(document).on('click', '.gjs-pn-btn.icon-undo', function(){
    um.undo();
});
$(document).on('click', '.gjs-pn-btn.icon-redo', function(){
    um.redo();
});
$(document).on('click', '.gjs-pn-btn.fa-trash', function(){
    um.clear();
});