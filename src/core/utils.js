export function encodeHTMLString(html) {
    const temp = document.createElement('template');
    temp.innerHTML = html.trim();

    return temp.content.firstChild;
}

export async function removeParentHTML(html_id) {
    const child = document.querySelector(html_id);
    child.parentElement.remove();
}
