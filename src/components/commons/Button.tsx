import * as React from "react";
import { computed } from "mobx";

export interface IButtonProps {
    width?: string;
    height?: string;
    value: string;
    isPrimary?: boolean;
    isSecondary?: boolean;
    isInfo?: boolean;
    action?: () => void;
}

export default class Button extends React.Component<IButtonProps> {
    public render() {
        const { width } = this.props;
        const { isPrimary, isSecondary, isInfo, action } = this.props;
        return (
            <div
                className={`button 
				${isPrimary ? "button--primary" : ""} 
			 	${isSecondary ? "button--secondary" : ""} 
				${isInfo ? "button--info" : ""}`}
                onClick={action}
                style={width ? { width: width } : { width: "148px" }}
            >
                {this.props.value}
            </div>
        );
    }
}
