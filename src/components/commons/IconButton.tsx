import * as React from "react";

export interface IIconButtonProps {
    isPrimary?: boolean;
    isSecondary?: boolean;
    icon: string
    onClick?: () => void
}

export default class IconButton extends React.Component<IIconButtonProps> {
    public render() {
        const { isPrimary, isSecondary, icon, onClick } = this.props;

        return (
            <div
                className={`icon-button ${
                    isPrimary ? "icon-button--primary" : ""
                } ${isSecondary ? "icon-button--secondary" : ""}`}
                onClick={onClick}
            >
                <img src={icon} alt=""/>
            </div>
        );
    }
}
