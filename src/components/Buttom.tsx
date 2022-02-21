import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLined?: boolean;
};

export function Buttom({isOutLined=false, ...props}: Props): JSX.Element {
    return(
        <button className={`button ${isOutLined ? 'outlined' : ''}`} {...props} />
    )
}

