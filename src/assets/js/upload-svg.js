const SUPPORTED_ELEMENTS_SVG = ["g", "line", "rect", "circle", "ellipse", "path", "polygon"];
$(function () {
    $("input[name=fileuploadsvg]").change(async function (event) {
        var fileToUpload = $(this).get(0).files;
        for (let i = 0; i < fileToUpload.length; i++) {
            const file = fileToUpload[i]
            if (file) {
                const { name } = file
                const result = await renderSvgGetPath(file)
                document.getElementById('newFile').innerHTML = result
                downloadFile(result, name)
            }
        }
    });

});

const renderSvgGetPath = (files) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
            let svgData = e.target.result
            let parser = new DOMParser()
            let doc = parser.parseFromString(svgData, 'image/svg+xml')
            let svg = doc.getElementsByTagName('svg')[0]
            document.body.appendChild(svg)
            let colors = []
            for (let i = 0; i < svg.childNodes.length; i++) {
                let child = svg.childNodes[i]
                if (child && child.tagName && SUPPORTED_ELEMENTS_SVG.find(o => o.toLocaleLowerCase() === child.tagName.toLocaleLowerCase())) {
                    const fill = window.getComputedStyle(child).fill
                    colors.push(fill)
                }
            }
            let path = svgToPath(svg, undefined, colors);
            svg.remove()
            setTimeout(() => {
                resolve(path)
            }, 100);
        }
        reader.readAsText(files)
        reader.onerror = reject
    })
}

const downloadFile = (data, name) => {
    var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}