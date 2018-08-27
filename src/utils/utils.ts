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