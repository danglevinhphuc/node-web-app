let uploading = false
const PROGRESS = 'progress'
const NONE = 'inherit'
const MP3 = 'mp3'

const loadingCursor = (value) => {
    document.body.style.cursor = value;
}

const closeProgress = () => {
    uploading = false
    loadingCursor(NONE)
}

const openProgress = () => {
    uploading = true
    loadingCursor(PROGRESS)
}

const addVideo = (videoFile) => {
    var video = document.getElementById('video');
    video.src = videoFile;
    video.load();
    video.play();
    document.getElementById('gif-image').style.display = "block"
}

const uploadFile = async () => {
    try {
        let formData = new FormData();
        if (!fileupload || !fileupload.files || !fileupload.files[0]) return
        formData.append("file", fileupload.files[0]);
        if (uploading) {
            return
        }

        openProgress()
        const response = await fetch('/upload', {
            method: "POST",
            body: formData
        });
        if (response) {
            const result = await response.json()
            addVideo(result.url)
        }

        closeProgress()
    } catch (error) {
        closeProgress()
        console.log(error)
    }
}

const downloadFile = (url) => {
    let tagA = document.getElementById('btn-download')
    tagA.style.display = "block"
    tagA.setAttribute('href', url)
}

const handleTrimVideo = async () => {
    try {
        const { video, start, end } = player
        if (!video) return

        const url = video.currentSrc
        const bodyData = {
            url,
            start,
            end
        }
        openProgress()
        const response = await fetch('/trim-mp3', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });
        const result = await response.json();
        if (result) {
            downloadFile(result)
        }
        closeProgress()
    } catch (error) {
        closeProgress()
        console.log(error)
    }
}