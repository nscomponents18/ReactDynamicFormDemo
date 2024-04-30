import React from "react";
import { addScript, addStyle, deleteLinkTagById, deleteScriptTagById, deleteStyleById, deleteStyleTagContainingText } from "../../AppUtils";
//import './tailwind.css';
import TailwindDemo from "./tailwindDemo";
import ReactDOM from "react-dom";

const TailwindDemoFrame: React.FC = () => {
    const iframeRef = React.useRef(null);

    React.useEffect(() => {
        let iframeDocument: any = null;
        if (iframeRef.current) {
            //@ts-ignore
            iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
            
            const script: string = `tailwind.config = {
                theme: {
                  extend: {
                    width: {
                    '33/100': '33%', // Adding custom width utility
                    }
                }
              }
            }
            `;
            const styles = `
            .container {
                display: flex;
                flex-direction: column;
                gap: 5px; 
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
              
              th {
                background-color: #f4f4f4;
              }
              
              .con {
                padding: 1.5rem;
                margin-right: 0;
                margin-left: 0;
                margin: 1rem 1 rem 0;
              }
              
              /* Navbar.css */
              .navbar ul {
                display: flex; /* Makes the list horizontal */
                list-style: none; /* Removes bullet points */
                padding: 0; /* Removes default padding */
                margin: 0; /* Removes default margin */
              }
              
              .navbar li {
                margin-right: 20px; /* Adds space between the links */
              }
              
              .navbar li:last-child {
                margin-right: 0; /* Removes margin from the last item */
              }
              
              .navbar a {
                text-decoration: none; /* Removes underline from links */
                color: #007bff; /* Sets link color */
                transition: color 0.3s; /* Smooth transition for color change */
              }
              
              .navbar a:hover {
                color: #0056b3; /* Color change on hover */
              }
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                min-width: 0;
                word-wrap: break-word;
                background-color: #fff;
                background-clip: border-box;
                border: 1px solid rgba(0, 0, 0, .125);
                border-radius: .25rem;
            }
            .card-header {
                padding: .5rem 1rem;
                margin-bottom: 0;
                background-color: rgba(0, 0, 0, .03);
                border-bottom: 1px solid rgba(0, 0, 0, .125);
            }
            .card-header:first-child {
                border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
            }
            .card-body {
                flex: 1 1 auto;
                padding: 1rem 1rem;
            }
            
            .toggle-switch {
              position: relative;
            }
            
            .toggle-switch-track {
                display: flex;
                background-color: black;
                align-items: center;
                border-radius: 35px;
                width: max-content;
                height: max-content;
            }
            
            .toggle-switch-checkbox {
                display: none !important;
            }
            
            .toggle-switch-text-con {
                height: max-content;
                width: max-content;
                display: flex;
                border-radius: 35px;
                align-items: center;
                justify-content: center;
                padding: 8px 12px;
                cursor: pointer;
                max-height: 30px;
                transition: background-color 0.3s ease;
                flex-grow: 1;
            }
            
            .active-bg {
                background-color: grey;
            }
            
            .inactive-bg {
                background-color: transparent;
            }
            
            .toggle-switch-text {
                color: white;
                font-size: 14px;
            }
            
            .toggle-switch.disabled .toggle-switch-track {
                cursor: not-allowed;
                opacity: 0.5;
            }
              
            .toggle-switch.disabled .toggle-switch-text-con {
                pointer-events: none;
            }
            `;
            addScript('https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries', null, 'tailwind',() => {
                //setRender(true,iframeDocument);
                addScript(null, script, 'tailwind-config', undefined, iframeDocument);
                addStyle(styles,'tailwind-style', iframeDocument);
                const rootDiv = iframeDocument.createElement('div');
            rootDiv.id = 'root';
            iframeDocument.body.appendChild(rootDiv);

            // Mount the React component inside the iframe
            ReactDOM.render(<TailwindDemo />, rootDiv);
            }, iframeDocument);


            
        }
        return () => {
            if(iframeDocument) {
                iframeDocument.body.innerHTML = '';
            }
        }
    }, []);

    return (
        <iframe ref={iframeRef} style={{width: "100vw", height:"100vh", border: "0px", marginTop: "10px" }} />
    );
};

export default TailwindDemoFrame;
