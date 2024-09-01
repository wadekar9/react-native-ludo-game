import { IMAGES } from '$assets/images';
import {COLORS} from '$constants/colors';

interface Image {
    name: string | number;
    image : any;
}

export class BackgroundImage {
    private static images: Array<Image> = [
        {
            name : COLORS.green,
            image : IMAGES.GreenPile
        },
        {
            name : COLORS.red,
            image : IMAGES.RedPile
        },
        {
            name : COLORS.yellow,
            image : IMAGES.YellowPile
        },
        {
            name : COLORS.blue,
            image : IMAGES.BluePile
        },
        {
            name : 1,
            image : IMAGES.Dice1
        },
        {
            name : 2,
            image : IMAGES.Dice2
        },
        {
            name : 3,
            image : IMAGES.Dice3
        },
        {
            name : 4,
            image : IMAGES.Dice4
        },
        {
            name : 5,
            image : IMAGES.Dice5
        },
        {
            name : 6,
            image : IMAGES.Dice6
        }
    ];

    static getImage = (name: string | number) => {
        const found = BackgroundImage.images.find(image => image.name === name);
        return found ? found.image : null;
    }
}