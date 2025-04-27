import { Tooltip } from "@mui/material";
import React from "react";

function BasicTooltip(props) {
    const {title, placement, children, ...otherProps} = props;

    if (title === undefined) return <span>{children}</span>;

    return (
        <Tooltip title={title}
                 placement={placement ? placement : 'bottom'}
                 arrow
                 enterDelay={300}
                 leaveDelay={50}
                 {...otherProps}
        >
                {children}
        </Tooltip>
    )
}

export default BasicTooltip;