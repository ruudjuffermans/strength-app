

import { Button as Base } from "@mui/material";
import React from "react";
import clsx from "clsx";
import { runWithoutPropagation } from "@utils/util";
import { useNavigate } from "react-router-dom";
import BasicTooltip from "../BasicTooltip";
import _ from "lodash";


const Button = React.forwardRef((props, ref) => {
    const {
        id, onClick, disabled, label, className, to, Icon, tooltip, type,
        outlined, text, positive, negative, disableAutoFocus = false, color="primary"
    } = props;

    if (_.sum([outlined, text, positive, negative]) > 1) {
        throw new Error("Button variants are not meant to be combined!");
    }

    if (_.sum([to, onClick]) > 1) {
        throw new Error("Button can either behave as clickable button or as link, but not both!")
    }

    const variant = React.useMemo(() => {
        if (outlined) return "outlined";
        if (text) return "text";
        return "contained";
    }, [outlined, text]);

    const navigate = useNavigate();
    const button = (
        <Base
            id={ id }
            ref={ ref }
            variant={variant}
            color={color}
            startIcon={ Icon ? <Icon fontSize='large'/> : undefined }
            className={ clsx("action-button", className, positive && 'positive', negative && 'negative') }
            onClick={ runWithoutPropagation(to ? () => navigate(to) : onClick) }
            disabled={ disabled }
            type={ type }
            disableRipple
            autoFocus={ !disableAutoFocus }
        >
            <span className="label">
                { label }
            </span>
        </Base>
    );
    if (tooltip == null) {
        return button;
    }
    return (
        <BasicTooltip
            title={ tooltip }
        >
            { button }
        </BasicTooltip>
    );
});

export default React.memo(Button);