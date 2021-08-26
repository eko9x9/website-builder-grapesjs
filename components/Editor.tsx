import React, { useEffect } from 'react';
import grapejs from "grapesjs";
import gjsPresetWeb from "grapesjs-preset-webpage";

function Editor() {

    useEffect(() => {
        const editorx = grapejs.init({
            container: "#editor",
            fromElement: true,
            plugins: [gjsPresetWeb],
            pluginsOpts: {
                gjsPresetWebpage: {
                    
                }
            },
            storageManager: {
                type: 'remote',
                stepsBeforeSave: 3,
                urlStore: 'http://192.168.43.105:1000',
                urlLoad: 'http://192.168.43.105:1000',
                autosave: true,
            }
        });

        // Add Button save
        editorx.Panels.addButton('options',
          [{
            id: 'save-db',
            className: 'fa fa-floppy-o',
            command: 'save-db',
            attributes: {title: 'Save DB'}
          }]
        );

        const pn = editorx.Panels;
        const eConfig = editorx.getConfig();
        const crc = 'create-comp';
        const mvc = 'move-comp';
        const swv = 'sw-visibility';
        const expt = 'export-template';
        const osm = 'open-sm';
        const otm = 'open-tm';
        const ola = 'open-layers';
        const obl = 'open-blocks';
        const ful = 'fullscreen';
        const prv = 'preview';
      
        eConfig.showDevices = 0;
      
        pn.getPanels().reset([{
          id: 'commands',
          buttons: [{}],
        },{
          id: 'options',
          buttons: [{
            id: swv,
            command: swv,
            context: swv,
            className: 'fa fa-square-o',
          },
          
          {
            id: prv,
            context: prv,
            command: (e: any) => e.runCommand(prv),
            className: 'fa fa-eye',
          },
          {
            id: ful,
            command: ful,
            context: ful,
            className: 'fa fa-arrows-alt',
          },{
            id: 'undo',
            className: 'fa fa-undo',
            command: (e: any) => e.runCommand('core:undo'),
          },{
            id: 'redo',
            className: 'fa fa-repeat',
            command: (e: any) => e.runCommand('core:redo'),
          },
          {
            id: "core:canvas-clear",
            className: 'fa fa-trash',
            command: (e: any) =>{
                const confrm = window.confirm("Delete template?");
                if(confrm){
                    window.alert("Deleted!");
                    return e.runCommand("core:canvas-clear")
                }

                return
            },
          },
        {
            id: 'save-db',
            className: 'fa fa-floppy-o',
            command: (editor: any, sender: any) => {
                sender && sender.set('active', 0); // turn off the button
                    editor.store();

                    var htmldata = editor.getHtml();
                    var cssdata = editor.getCss();
                    console.log(htmldata);
                    console.log(cssdata);
                    alert("Saved!");

                return editor.runCommand("save-db")
            },
            attributes: {title: 'Save DB'}
        },
        {
            id: "set-device-mobile",
            context: "set-device-mobile",
            className: 'fa fa-mobile',
            command: (e: any) => e.runCommand("set-device-mobile"),
            attributes: {title: 'Mobile'}
        },
        {
            id: "set-device-tablet",
            context: "set-device-tablet",
            className: 'fa fa-tablet',
            command: (e: any) => e.runCommand("set-device-tablet"),
            attributes: {title: 'Tablet'}
        },
        {
            id: "set-device-desktop",
            context: "set-device-desktop",
            className: 'fa fa-desktop',
            command: (e: any) => e.runCommand("set-device-desktop"),
            attributes: {title: 'Desktop'}
        },
        ],
        },{
          id: 'views',
          buttons  : [{
            id: osm,
            command: osm,
            active: true,
            className: 'fa fa-paint-brush',
          },{
            id: otm,
            command: otm,
            className: 'fa fa-cog',
          },{
            id: ola,
            command: ola,
            className: 'fa fa-bars',
          },{
            id: obl,
            command: obl,
            className: 'fa fa-th-large',
          }],
        }]);
  
    }, []);

    return (
        <div className="App">
            <div id="editor">
                
            </div>
        </div>
    );
}

export default Editor;
