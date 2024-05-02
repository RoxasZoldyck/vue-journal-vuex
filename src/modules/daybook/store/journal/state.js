//El objeto que definimos dentro, tiene que ser reactivo

export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),// 21321321
            date: new Date().toDateString(), //sat 27, julio
            text: 'Laborum eiusmod id est deserunt proident. Dolor sunt commodo fugiat fugiat. Et sunt proident cupidatat sint velit dolore velit sint. Laborum in qui anim ullamco laboris irure nulla nulla cupidatat. Elit esse exercitation aliqua aliquip esse qui laborum exercitation dolore. Laborum occaecat do irure aliqua ullamco do ex excepteur laboris ex in. Nisi nisi est in Lorem duis occaecat laboris labore.',
            picture: null, //https://
        },
        {
            id: new Date().getTime() + 1000,// 21321321
            date: new Date().toDateString(), //sat 27, julio
            text: 'Enim incididunt eiusmod duis amet do aute amet cupidatat enim ad laborum esse. Anim eu sit excepteur id ipsum ipsum dolore culpa tempor adipisicing qui laboris aute eiusmod. Amet sint quis ipsum labore reprehenderit enim ex.',
            picture: null, //https://
        },
        {
            id: new Date().getTime() + 2000,// 21321321
            date: new Date().toDateString(), //sat 27, julio
            text: 'Ad sint pariatur nulla velit ut deserunt mollit. Ut ullamco minim laborum commodo sunt minim officia pariatur ipsum exercitation pariatur. Ipsum culpa laborum Lorem tempor cupidatat cillum sint Lorem ad ex proident occaecat et aliqua.',
            picture: null, //https://
        },
    ]
})