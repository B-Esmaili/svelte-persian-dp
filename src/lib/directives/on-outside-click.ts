

export function clickOutside(element: HTMLElement, callbackFunction: () => void) {
    function onClick(event: MouseEvent | null) {
        if (event?.target && !element.contains(event.target as HTMLElement)) {
            callbackFunction();
        }
    }

    document.addEventListener('click', onClick);

    return {
        update(newCallbackFunction: () => void) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.removeEventListener('click', onClick);
        }
    }
}
