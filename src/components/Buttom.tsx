import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Buttom(props: Props): JSX.Element {
    return(
        <button className="button" {...props}/>
    )
}

