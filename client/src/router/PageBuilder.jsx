import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useTheme } from "@emotion/react";
import { getColors } from "../theme";
import { useMediaQuery } from "@mui/material";
import PagePaper from "@components/CustomPaper/Pagepaper";


export class PageBuilder {
    constructor(element = <></>) {
        this._element = element;
        this._props = {};
        this._useHookedProps = () => ({});
        this._wrapInPagePaper = false;
        this._title = undefined;
        this._subtitle = undefined;
    }

    element(element) {
        this._element = element;
        return this;
    }

    props(props) {
        this._props = { ...this._props, ...props };
        return this;
    }

    title(title) {
        this._title = title;
        this._wrapInPagePaper = true;
        return this;
    }

    subtitle(subtitle) {
        this._subtitle = subtitle;
        this._wrapInPagePaper = true;
        return this;
    }

    includeParams() {
        const useHookedProps = this._useHookedProps;

        this._useHookedProps = () => {
            const params = useParams();
            return {
                ...useHookedProps?.(),
                params,
            };
        };

        return this;
    }

    includeUserContext() {
        function useHookedProps() {
            const { user } = useAuth()
            return { user, isAdmin: user.role == "Admin" };
        }

        this._useHookedProps = useHookedProps;
        return this;
    }

    includeNavigate() {
        const useHookedProps = this._useHookedProps;

        this._useHookedProps = () => {
            const navigate = useNavigate();
            return {
                ...useHookedProps?.(),
                navigate,
            };
        };

        return this;
    }

    includeTheme() {
        const useHookedProps = this._useHookedProps;

        this._useHookedProps = () => {
            const theme = useTheme();
            const colors = getColors(theme.palette.mode);
            return {
                ...useHookedProps?.(),
                theme, colors,
            };
        };

        return this;
    }

    includeMobile() {
        const useHookedProps = this._useHookedProps;

        this._useHookedProps = () => {
            const isMobile = useMediaQuery("(max-width:600px)");
            return {
                ...useHookedProps?.(),
                isMobile,
            };
        };

        return this;
    }

    build() {
        const useHookedProps = this._useHookedProps;
        const Element = this._element;
        const staticProps = this._props;
        const wrapInPaper = this._wrapInPagePaper;
        const title = this._title;
        const subtitle = this._subtitle;

        return props => {
            const hookedProps = useHookedProps();

            const content = (
                <Element
                    {...props}
                    {...staticProps}
                    {...hookedProps}
                />
            );

            return (
                <PageContextProvider>
                    {wrapInPaper ? (
                        <PagePaper title={title} subtitle={subtitle}>
                            {content}
                        </PagePaper>
                    ) : (
                        content
                    )}
                </PageContextProvider>
            )
        }
    }
}

export function PageContextProvider({ children }) {
    return children;
}