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

const flatten = (a, result) => {
    if (a.firstChild === null) {
        result.push(a)
    }
    else if (a.childNodes.length > 0) {
        var c = a.childNodes
        Array.from(c).forEach(function (v) {
            if (v.firstChild === null) {
                result.push(v)
            }
            else {
                flatten.apply(this, [v, result])
            }
        })
    }
    return result
}


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
            let childNodesSvg = []
            let resultData = flatten(svg, childNodesSvg)
            for (let i = 0; i < resultData.length; i++) {
                let child = resultData[i]
                if (child && child.tagName && SUPPORTED_ELEMENTS_SVG.find(o => o.toLocaleLowerCase() === child.tagName.toLocaleLowerCase())) {
                    const fill = window.getComputedStyle(child).fill
                    colors.push(fill)
                }
            }
            let path = svgToPath(svg, undefined, colors, resultData);
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