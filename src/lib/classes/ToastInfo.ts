export interface ToastInfo {
    text: string;
    classes: string;
}

export const addToast = (
    toasts: ToastInfo[],
    text: string,
    classes: string,
    duration: number = 4,
) => {
    toasts.push({
        text: text,
        classes: classes,
    });

    while (toasts.length > 4) {
        toasts.shift();
    }

    setTimeout(() => {
        toasts.shift();
    }, duration * 1000);
};
