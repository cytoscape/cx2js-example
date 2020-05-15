function fetchJSON(file, callback, elementId) {
    fetch(file)
        .then(function (response) {
            return response.json();
        })
        .then(function (cx) { callback(cx, elementId) })
};

const convertCX = function (cx, elementId) {
    const element = document.getElementById(elementId);

    const utils = new cytoscapeCx2js.CyNetworkUtils()
    const niceCX = utils.rawCXtoNiceCX(cx);
    const cx2Js = new cytoscapeCx2js.CxToJs(utils);

    let attributeNameMap = {};

    const elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);
    const style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap);
    const cyBackgroundColor = cx2Js.cyBackgroundColorFromNiceCX(niceCX);
    const layout = cx2Js.getDefaultLayout();
    const zoom = cx2Js.cyZoomFromNiceCX(niceCX);
    const pan = cx2Js.cyPanFromNiceCX(niceCX);

    element.style.backgroundColor = cyBackgroundColor;

    const cytoscapeJS = {
        container: element,
        style: style,
        elements: elements,
        layout: layout,
        zoom: zoom,
        pan: pan
    };

    const cy = cytoscape(cytoscapeJS);
    cy.fit()
};