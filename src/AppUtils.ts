import { error } from "console";

export const deleteStyleTagContainingText = (searchText: string, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    const styleTags = doc.head.getElementsByTagName('style');
    const regex = new RegExp(searchText, 'i');

    for (let i = 0; i < styleTags.length; i++) {
        const content = styleTags[i].textContent;
        console.log(content && regex.test(content));
        if (content && regex.test(content)) {
            console.log('Style tag found:', styleTags[i]);
            doc.head.removeChild(styleTags[i]);
        }
    }
};

export const addLink = (href: string, styleId: string | null = null,callback?: () => void | undefined, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    if(styleId && doc.getElementById(styleId) && doc.getElementById(styleId)?.tagName === 'STYLE') {
        console.log(`Style tag with id '${styleId}' is already added.`);
        return;
    }
    const link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    if(styleId) {
        link.id = styleId;
    }
    doc.head.appendChild(link);

    link.onload = () => {
        callback && callback();
        console.log(`${href} CSS has loaded!`)
    };
    link.onerror = () => console.error(`${href} Failed to load CSS.`);
};

export const deleteLinkTagById = (linkId: string, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    const linkElements = doc.querySelectorAll(`#${linkId}`);
    if(linkElements && linkElements.length > 0) {
        linkElements.forEach(linkElement => {
            if (linkElement && linkElement.tagName === 'LINK') {
                linkElement.parentNode?.removeChild(linkElement);
                console.log(`Link tag with id '${linkId}' has been removed.`);
            } else {
                console.log(`No Link tag found with the id '${linkId}'.`);
            }
        });
    }
};

export const addScript = (src: string | null, code: string | null, scriptId: string | null = null,callback?: () => void | undefined, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    if(!src && !code) {
        throw new Error('Enter one of the arguments for src or code in function loadJS');
    }
    if(scriptId && doc.getElementById(scriptId) && doc.getElementById(scriptId)?.tagName === 'SCRIPT') {
        console.warn(`Script tag with id '${scriptId}' is already added.`);
        return;
    }
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    if(src) {
        script.src = src;
    } else if(code) {
        script.innerHTML = code;
    }
    if(scriptId) {
        script.id = scriptId;
    }
    doc.head.appendChild(script);

    script.onload = () => {
      console.log(`${scriptId || ''} JS has loaded!`);
      callback && callback();
    };
    script.onerror = () => console.error(`${scriptId || ''} Failed to load JS.`);
};

export const deleteScriptTagById = (scriptId: string, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    const styleElements = doc.querySelectorAll(`#${scriptId}`);
    if(styleElements && styleElements.length > 0) {
        styleElements.forEach(styleElement => {
            if (styleElement && styleElement.tagName === 'SCRIPT') {
                styleElement.parentNode?.removeChild(styleElement);
                console.log(`Script tag with id '${scriptId}' has been removed.`);
            } else {
                console.log(`No Script tag found with the id '${scriptId}'.`);
            }
        });
    }
};

export const addStyle = (code: string, styleId: string | null = null, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    if(styleId && doc.getElementById(styleId) && doc.getElementById(styleId)?.tagName === 'STYLE') {
        console.warn(`Style tag with id '${styleId}' is already added.`);
        return;
    }
    const style = doc.createElement('style');
    style.innerHTML = code;
    if(styleId) {
        style.id = styleId;
    }
    doc.head.appendChild(style);
};

export const deleteStyleById = (styleId: string, doc?: Document): void => {
    if(!doc) {
        doc = document;
    }
    const styleElements = doc.querySelectorAll(`#${styleId}`);
    if(styleElements && styleElements.length > 0) {
        styleElements.forEach(styleElement => {
            if (styleElement && styleElement.tagName === 'STYLE') {
                styleElement.parentNode?.removeChild(styleElement);
                console.log(`Style tag with id '${styleId}' has been removed.`);
            } else {
                console.log(`No style tag found with the id '${styleId}'.`);
            }
        });
    }
};

