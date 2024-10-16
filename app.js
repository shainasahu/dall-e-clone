const submitIcon = document.querySelector('#submit-icon');
const inputElement = document.querySelector('input');
const imageSection = document.querySelector('.images-section');

const getImages = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            model:"dall-e-2",
            response_format: "url",
            prompt: inputElement.value,
            n: 1,
            size: "256x256"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations',options);
        const data = await response.json();
        console.log(data);
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement('div')
            imageContainer.classList.add('image-container')
            const imageElement = document.createElement('img')
            imageElement.setAttribute('src', imageObject.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)
        })
    } catch (error) {
        console.error(error);
    }
}

submitIcon.addEventListener('click',getImages);