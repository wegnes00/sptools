export let debounce = function(func, wait) {
    var timeout = null;
    return function() {
        var args = arguments;
        var later = () => {
            timeout = null;
            func.apply(this, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

export function getClassName(classNames: string[], styles?:any) : string {
    if (!classNames || !classNames.length) return "";

    let className = [
        ...classNames,
        ...classNames.map(c => styles[c] || "")
    ].filter(c => c).join(" ");
 
    return className
}

export function downloadFile(filename:string, text:string) : void {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function getDateString(date?: Date) : string {
    date = date || new Date();
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
};