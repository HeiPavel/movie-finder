export const elementsForRender = (selectedElements, elements) => {
    if (!selectedElements.length) return elements;
    const result =  elements.filter(element => !selectedElements.some(selEl => selEl.id === element.id));
    result.unshift(...selectedElements);
    return result;
}