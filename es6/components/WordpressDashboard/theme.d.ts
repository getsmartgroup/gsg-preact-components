export declare const theme: import("@chakra-ui/react").BaseThemeWithExtensions<{
    components: {
        Accordion: {
            parts: string[];
            baseStyle: {
                container: {
                    borderTopWidth: string;
                    borderColor: string;
                    _last: {
                        borderBottomWidth: string;
                    };
                };
                button: {
                    transitionProperty: string;
                    transitionDuration: string;
                    fontSize: string;
                    _focus: {
                        boxShadow: string;
                    };
                    _hover: {
                        bg: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    px: number;
                    py: number;
                };
                panel: {
                    pt: number;
                    px: number;
                    pb: number;
                };
                icon: {
                    fontSize: string;
                };
            };
        };
        Alert: {
            parts: string[];
            baseStyle: {
                container: {
                    px: number;
                    py: number;
                };
                title: {
                    fontWeight: string;
                    lineHeight: number;
                    marginEnd: number;
                };
                description: {
                    lineHeight: number;
                };
                icon: {
                    flexShrink: number;
                    marginEnd: number;
                    w: number;
                    h: number;
                };
            };
            variants: {
                subtle: (props: Record<string, any>) => {
                    container: {
                        bg: any;
                    };
                    icon: {
                        color: any;
                    };
                };
                "left-accent": (props: Record<string, any>) => {
                    container: {
                        paddingStart: number;
                        borderStartWidth: string;
                        borderStartColor: any;
                        bg: any;
                    };
                    icon: {
                        color: any;
                    };
                };
                "top-accent": (props: Record<string, any>) => {
                    container: {
                        pt: number;
                        borderTopWidth: string;
                        borderTopColor: any;
                        bg: any;
                    };
                    icon: {
                        color: any;
                    };
                };
                solid: (props: Record<string, any>) => {
                    container: {
                        bg: any;
                        color: any;
                    };
                };
            };
            defaultProps: {
                variant: string;
                colorScheme: string;
            };
        };
        Avatar: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                badge: {
                    transform: string;
                    borderRadius: string;
                    border: string;
                    borderColor: any;
                };
                excessLabel: {
                    bg: any;
                };
                container: {
                    bg: string;
                    color: string;
                    borderColor: any;
                    verticalAlign: string;
                };
            };
            sizes: {
                "2xs": {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                xs: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                sm: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                md: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                lg: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                xl: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                "2xl": {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
                full: {
                    container: {
                        width: string;
                        height: string;
                        fontSize: string;
                    };
                    excessLabel: {
                        width: string;
                        height: string;
                    };
                    label: {
                        fontSize: string;
                        lineHeight: any;
                    };
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Badge: {
            baseStyle: {
                px: number;
                textTransform: string;
                fontSize: string;
                borderRadius: string;
                fontWeight: string;
            };
            variants: {
                solid: (props: Record<string, any>) => {
                    bg: any;
                    color: any;
                };
                subtle: (props: Record<string, any>) => {
                    bg: any;
                    color: any;
                };
                outline: (props: Record<string, any>) => {
                    color: any;
                    boxShadow: string;
                };
            };
            defaultProps: {
                variant: string;
                colorScheme: string;
            };
        };
        Breadcrumb: {
            parts: string[];
            baseStyle: {
                link: {
                    transitionProperty: string;
                    transitionDuration: string;
                    transitionTimingFunction: string;
                    cursor: string;
                    textDecoration: string;
                    outline: string;
                    color: string;
                    _hover: {
                        textDecoration: string;
                    };
                    _focus: {
                        boxShadow: string;
                    };
                };
            };
        };
        Button: {
            baseStyle: {
                lineHeight: string;
                borderRadius: string;
                fontWeight: string;
                transitionProperty: string;
                transitionDuration: string;
                _focus: {
                    boxShadow: string;
                };
                _disabled: {
                    opacity: number;
                    cursor: string;
                    boxShadow: string;
                };
                _hover: {
                    _disabled: {
                        bg: string;
                    };
                };
            };
            variants: {
                ghost: (props: Record<string, any>) => {
                    color: any;
                    _hover: {
                        bg: any;
                    };
                    _active: {
                        bg: any;
                    };
                    bg?: undefined;
                } | {
                    color: any;
                    bg: string;
                    _hover: {
                        bg: any;
                    };
                    _active: {
                        bg: any;
                    };
                };
                outline: (props: Record<string, any>) => {
                    color: any;
                    _hover: {
                        bg: any;
                    };
                    _active: {
                        bg: any;
                    };
                    bg?: undefined;
                    border: string;
                    borderColor: any;
                } | {
                    color: any;
                    bg: string;
                    _hover: {
                        bg: any;
                    };
                    _active: {
                        bg: any;
                    };
                    border: string;
                    borderColor: any;
                };
                solid: (props: Record<string, any>) => {
                    bg: any;
                    _hover: {
                        bg: any;
                        _disabled: {
                            bg: any;
                        };
                    };
                    _active: {
                        bg: any;
                    };
                    color?: undefined;
                } | {
                    bg: any;
                    color: any;
                    _hover: {
                        bg: any;
                        _disabled: {
                            bg: any;
                        };
                    };
                    _active: {
                        bg: any;
                    };
                };
                link: (props: Record<string, any>) => {
                    padding: number;
                    height: string;
                    lineHeight: string;
                    verticalAlign: string;
                    color: any;
                    _hover: {
                        textDecoration: string;
                        _disabled: {
                            textDecoration: string;
                        };
                    };
                    _active: {
                        color: any;
                    };
                };
                unstyled: {
                    bg: string;
                    color: string;
                    display: string;
                    lineHeight: string;
                    m: number;
                    p: number;
                };
            };
            sizes: {
                lg: {
                    h: number;
                    minW: number;
                    fontSize: string;
                    px: number;
                };
                md: {
                    h: number;
                    minW: number;
                    fontSize: string;
                    px: number;
                };
                sm: {
                    h: number;
                    minW: number;
                    fontSize: string;
                    px: number;
                };
                xs: {
                    h: number;
                    minW: number;
                    fontSize: string;
                    px: number;
                };
            };
            defaultProps: {
                variant: string;
                size: string;
                colorScheme: string;
            };
        };
        Checkbox: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                icon: {
                    transitionProperty: string;
                    transitionDuration: string;
                };
                control: {
                    w: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    border: string;
                    borderRadius: string;
                    borderColor: string;
                    color: string;
                    _checked: {
                        bg: any;
                        borderColor: any;
                        color: any;
                        _hover: {
                            bg: any;
                            borderColor: any;
                        };
                        _disabled: {
                            borderColor: any;
                            bg: any;
                            color: any;
                        };
                    };
                    _indeterminate: {
                        bg: any;
                        borderColor: any;
                        color: any;
                    };
                    _disabled: {
                        bg: any;
                        borderColor: any;
                    };
                    _focus: {
                        boxShadow: string;
                    };
                    _invalid: {
                        borderColor: any;
                    };
                };
                label: {
                    userSelect: string;
                    _disabled: {
                        opacity: number;
                    };
                };
            };
            sizes: {
                sm: {
                    control: {
                        h: number;
                        w: number;
                    };
                    label: {
                        fontSize: string;
                    };
                    icon: {
                        fontSize: string;
                    };
                };
                md: {
                    control: {
                        w: number;
                        h: number;
                    };
                    label: {
                        fontSize: string;
                    };
                    icon: {
                        fontSize: string;
                    };
                };
                lg: {
                    control: {
                        w: number;
                        h: number;
                    };
                    label: {
                        fontSize: string;
                    };
                    icon: {
                        fontSize: string;
                    };
                };
            };
            defaultProps: {
                size: string;
                colorScheme: string;
            };
        };
        CloseButton: {
            baseStyle: (props: Record<string, any>) => {
                borderRadius: string;
                transitionProperty: string;
                transitionDuration: string;
                _disabled: {
                    opacity: number;
                    cursor: string;
                    boxShadow: string;
                };
                _hover: {
                    bg: any;
                };
                _active: {
                    bg: any;
                };
                _focus: {
                    boxShadow: string;
                };
            };
            sizes: {
                lg: {
                    w: string;
                    h: string;
                    fontSize: string;
                };
                md: {
                    w: string;
                    h: string;
                    fontSize: string;
                };
                sm: {
                    w: string;
                    h: string;
                    fontSize: string;
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Code: {
            baseStyle: {
                fontFamily: string;
                fontSize: string;
                px: string;
                borderRadius: string;
            };
            variants: {
                solid: (props: Record<string, any>) => {
                    bg: any;
                    color: any;
                };
                subtle: (props: Record<string, any>) => {
                    bg: any;
                    color: any;
                };
                outline: (props: Record<string, any>) => {
                    color: any;
                    boxShadow: string;
                };
            };
            defaultProps: {
                variant: string;
                colorScheme: string;
            };
        };
        Container: {
            baseStyle: {
                w: string;
                mx: string;
                maxW: string;
                px: string;
            };
        };
        Divider: {
            baseStyle: {
                opacity: number;
                borderColor: string;
            };
            variants: {
                solid: {
                    borderStyle: string;
                };
                dashed: {
                    borderStyle: string;
                };
            };
            defaultProps: {
                variant: string;
            };
        };
        Drawer: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                overlay: {
                    bg: string;
                    zIndex: string;
                };
                dialogContainer: {
                    display: string;
                    zIndex: string;
                    justifyContent: string;
                };
                dialog: any;
                header: {
                    px: number;
                    py: number;
                    fontSize: string;
                    fontWeight: string;
                };
                closeButton: {
                    position: string;
                    top: number;
                    insetEnd: number;
                };
                body: {
                    px: number;
                    py: number;
                    flex: number;
                    overflow: string;
                };
                footer: {
                    px: number;
                    py: number;
                };
            };
            sizes: {
                xs: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
                sm: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
                md: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
                lg: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
                xl: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
                full: {
                    dialog: {
                        maxW: string;
                        h: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        h?: undefined;
                    };
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Editable: {
            parts: string[];
            baseStyle: {
                preview: {
                    borderRadius: string;
                    py: string;
                    transitionProperty: string;
                    transitionDuration: string;
                };
                input: {
                    borderRadius: string;
                    py: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    width: string;
                    _focus: {
                        boxShadow: string;
                    };
                    _placeholder: {
                        opacity: number;
                    };
                };
            };
        };
        Form: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                requiredIndicator: {
                    marginStart: number;
                    color: any;
                };
                helperText: {
                    mt: number;
                    color: any;
                    lineHeight: string;
                    fontSize: string;
                };
            };
        };
        FormLabel: {
            baseStyle: {
                fontSize: string;
                marginEnd: number;
                mb: number;
                fontWeight: string;
                transitionProperty: string;
                transitionDuration: string;
                opacity: number;
                _disabled: {
                    opacity: number;
                };
            };
        };
        Heading: {
            baseStyle: {
                fontFamily: string;
                fontWeight: string;
            };
            sizes: {
                "4xl": {
                    fontSize: (string | null)[];
                    lineHeight: number;
                };
                "3xl": {
                    fontSize: (string | null)[];
                    lineHeight: number;
                };
                "2xl": {
                    fontSize: (string | null)[];
                    lineHeight: (number | null)[];
                };
                xl: {
                    fontSize: (string | null)[];
                    lineHeight: (number | null)[];
                };
                lg: {
                    fontSize: (string | null)[];
                    lineHeight: (number | null)[];
                };
                md: {
                    fontSize: string;
                    lineHeight: number;
                };
                sm: {
                    fontSize: string;
                    lineHeight: number;
                };
                xs: {
                    fontSize: string;
                    lineHeight: number;
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Input: {
            parts: string[];
            baseStyle: {
                field: {
                    width: string;
                    minWidth: number;
                    outline: number;
                    position: string;
                    appearance: string;
                    transitionProperty: string;
                    transitionDuration: string;
                };
            };
            sizes: {
                lg: {
                    field: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    addon: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                };
                md: {
                    field: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    addon: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                };
                sm: {
                    field: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    addon: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                };
                xs: {
                    field: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    addon: {
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                };
            };
            variants: {
                outline: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: string;
                        _hover: {
                            borderColor: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            zIndex: number;
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: any;
                        bg: any;
                    };
                };
                filled: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: any;
                        _hover: {
                            bg: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                        };
                        _focus: {
                            bg: string;
                            borderColor: any;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: string;
                        bg: any;
                    };
                };
                flushed: (props: Record<string, any>) => {
                    field: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                    };
                };
                unstyled: {
                    field: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                    addon: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                };
            };
            defaultProps: {
                size: string;
                variant: string;
            };
        };
        Kbd: {
            baseStyle: (props: Record<string, any>) => {
                bg: any;
                borderRadius: string;
                borderWidth: string;
                borderBottomWidth: string;
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
                px: string;
                whiteSpace: string;
            };
        };
        Link: {
            baseStyle: {
                transitionProperty: string;
                transitionDuration: string;
                transitionTimingFunction: string;
                cursor: string;
                textDecoration: string;
                outline: string;
                color: string;
                _hover: {
                    textDecoration: string;
                };
                _focus: {
                    boxShadow: string;
                };
            };
        };
        List: {
            parts: string[];
            baseStyle: {
                container: {};
                item: {};
                icon: {
                    marginEnd: string;
                    display: string;
                    verticalAlign: string;
                };
            };
        };
        Menu: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                button: {
                    transitionProperty: string;
                    transitionDuration: string;
                };
                list: {
                    bg: any;
                    boxShadow: any;
                    color: string;
                    minW: string;
                    py: string;
                    zIndex: number;
                    borderRadius: string;
                    borderWidth: string;
                };
                item: {
                    py: string;
                    px: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    transitionTimingFunction: string;
                    _focus: {
                        bg: any;
                    };
                    _active: {
                        bg: any;
                    };
                    _expanded: {
                        bg: any;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                };
                groupTitle: {
                    mx: number;
                    my: number;
                    fontWeight: string;
                    fontSize: string;
                };
                command: {
                    opacity: number;
                };
                divider: {
                    border: number;
                    borderBottom: string;
                    borderColor: string;
                    my: string;
                    opacity: number;
                };
            };
        };
        Modal: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                overlay: {
                    bg: string;
                    zIndex: string;
                };
                dialogContainer: {
                    display: string;
                    zIndex: string;
                    justifyContent: string;
                    alignItems: string;
                    overflow: string;
                };
                dialog: {
                    borderRadius: string;
                    bg: any;
                    color: string;
                    my: string;
                    zIndex: string;
                    maxH: string | undefined;
                    boxShadow: any;
                };
                header: {
                    px: number;
                    py: number;
                    fontSize: string;
                    fontWeight: string;
                };
                closeButton: {
                    position: string;
                    top: number;
                    insetEnd: number;
                };
                body: {
                    px: number;
                    py: number;
                    flex: number;
                    overflow: string | undefined;
                };
                footer: {
                    px: number;
                    py: number;
                };
            };
            sizes: {
                xs: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                sm: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                md: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                lg: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                xl: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                "2xl": {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                "3xl": {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                "4xl": {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                "5xl": {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                "6xl": {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
                full: {
                    dialog: {
                        maxW: string;
                        minH: string;
                    };
                } | {
                    dialog: {
                        maxW: string;
                        minH?: undefined;
                    };
                };
            };
            defaultProps: {
                size: string;
            };
        };
        NumberInput: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                root: {
                    "--number-input-stepper-width": string;
                    "--number-input-field-padding": string;
                };
                field: {
                    width: string;
                    minWidth: number;
                    outline: number;
                    position: string;
                    appearance: string;
                    transitionProperty: string;
                    transitionDuration: string;
                };
                stepperGroup: {
                    width: string;
                };
                stepper: {
                    borderStart: string;
                    borderStartColor: any;
                    color: any;
                    _active: {
                        bg: any;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                };
            };
            sizes: {
                xs: {
                    field: {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    stepper: {
                        fontSize: string;
                        _first: {
                            borderTopEndRadius: string;
                        };
                        _last: {
                            borderBottomEndRadius: string;
                            mt: string;
                            borderTopWidth: number;
                        };
                    };
                };
                sm: {
                    field: {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    stepper: {
                        fontSize: string;
                        _first: {
                            borderTopEndRadius: string;
                        };
                        _last: {
                            borderBottomEndRadius: string;
                            mt: string;
                            borderTopWidth: number;
                        };
                    };
                };
                md: {
                    field: {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    stepper: {
                        fontSize: string;
                        _first: {
                            borderTopEndRadius: string;
                        };
                        _last: {
                            borderBottomEndRadius: string;
                            mt: string;
                            borderTopWidth: number;
                        };
                    };
                };
                lg: {
                    field: {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    } | {
                        paddingInlineEnd: string;
                        verticalAlign: string;
                        fontSize: string;
                        px: number;
                        h: number;
                        borderRadius: string;
                    };
                    stepper: {
                        fontSize: string;
                        _first: {
                            borderTopEndRadius: string;
                        };
                        _last: {
                            borderBottomEndRadius: string;
                            mt: string;
                            borderTopWidth: number;
                        };
                    };
                };
            };
            variants: {
                outline: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: string;
                        _hover: {
                            borderColor: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            zIndex: number;
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: any;
                        bg: any;
                    };
                };
                filled: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: any;
                        _hover: {
                            bg: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                        };
                        _focus: {
                            bg: string;
                            borderColor: any;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: string;
                        bg: any;
                    };
                };
                flushed: (props: Record<string, any>) => {
                    field: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                    };
                };
                unstyled: {
                    field: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                    addon: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                };
            };
            defaultProps: {
                size: string;
                variant: string;
            };
        };
        PinInput: {
            baseStyle: {
                textAlign: string;
                width: string;
                minWidth: number;
                outline: number;
                position: string;
                appearance: string;
                transitionProperty: string;
                transitionDuration: string;
            };
            sizes: {
                lg: {
                    fontSize: string;
                    w: number;
                    h: number;
                    borderRadius: string;
                };
                md: {
                    fontSize: string;
                    w: number;
                    h: number;
                    borderRadius: string;
                };
                sm: {
                    fontSize: string;
                    w: number;
                    h: number;
                    borderRadius: string;
                };
                xs: {
                    fontSize: string;
                    w: number;
                    h: number;
                    borderRadius: string;
                };
            };
            variants: {
                outline: (props: Record<string, any>) => {
                    border: string;
                    borderColor: string;
                    bg: string;
                    _hover: {
                        borderColor: any;
                    };
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    _invalid: {
                        borderColor: any;
                        boxShadow: string;
                    };
                    _focus: {
                        zIndex: number;
                        borderColor: any;
                        boxShadow: string;
                    };
                };
                flushed: (props: Record<string, any>) => {
                    borderBottom: string;
                    borderColor: string;
                    borderRadius: number;
                    px: number;
                    bg: string;
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _invalid: {
                        borderColor: any;
                        boxShadow: string;
                    };
                    _focus: {
                        borderColor: any;
                        boxShadow: string;
                    };
                };
                filled: (props: Record<string, any>) => {
                    border: string;
                    borderColor: string;
                    bg: any;
                    _hover: {
                        bg: any;
                    };
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    _invalid: {
                        borderColor: any;
                    };
                    _focus: {
                        bg: string;
                        borderColor: any;
                    };
                };
                unstyled: {
                    bg: string;
                    px: number;
                    height: string;
                };
            };
            defaultProps: {
                size: string;
                variant: string;
            };
        };
        Popover: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                popper: {
                    zIndex: number;
                };
                content: {
                    "--popover-bg": string;
                    bg: string;
                    "--popper-arrow-bg": string;
                    "--popper-arrow-shadow-color": string;
                    width: string;
                    border: string;
                    borderColor: string;
                    borderRadius: string;
                    boxShadow: string;
                    zIndex: string;
                    _focus: {
                        outline: number;
                        boxShadow: string;
                    };
                };
                header: {
                    px: number;
                    py: number;
                    borderBottomWidth: string;
                };
                body: {
                    px: number;
                    py: number;
                };
                footer: {
                    px: number;
                    py: number;
                    borderTopWidth: string;
                };
                arrow: {};
            };
        };
        Progress: {
            parts: string[];
            sizes: {
                xs: {
                    track: {
                        h: string;
                    };
                };
                sm: {
                    track: {
                        h: string;
                    };
                };
                md: {
                    track: {
                        h: string;
                    };
                };
                lg: {
                    track: {
                        h: string;
                    };
                };
            };
            baseStyle: (props: Record<string, any>) => {
                label: {
                    lineHeight: string;
                    fontSize: string;
                    fontWeight: string;
                    color: string;
                };
                filledTrack: any;
                track: {
                    bg: any;
                };
            };
            defaultProps: {
                size: string;
                colorScheme: string;
            };
        };
        Radio: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                label: {
                    userSelect: string;
                    _disabled: {
                        opacity: number;
                    };
                };
                control: {
                    borderRadius: string;
                    _checked: {
                        _before: {
                            content: string;
                            display: string;
                            pos: string;
                            w: string;
                            h: string;
                            borderRadius: string;
                            bg: string;
                        };
                        bg: any;
                        borderColor: any;
                        color: any;
                        _hover: {
                            bg: any;
                            borderColor: any;
                        };
                        _disabled: {
                            borderColor: any;
                            bg: any;
                            color: any;
                        };
                    };
                    w: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    border: string;
                    borderColor: string;
                    color: string;
                    _indeterminate: {
                        bg: any;
                        borderColor: any;
                        color: any;
                    };
                    _disabled: {
                        bg: any;
                        borderColor: any;
                    };
                    _focus: {
                        boxShadow: string;
                    };
                    _invalid: {
                        borderColor: any;
                    };
                };
            };
            sizes: {
                md: {
                    control: {
                        w: number;
                        h: number;
                    };
                    label: {
                        fontSize: string;
                    };
                };
                lg: {
                    control: {
                        w: number;
                        h: number;
                    };
                    label: {
                        fontSize: string;
                    };
                };
                sm: {
                    control: {
                        width: number;
                        height: number;
                    };
                    label: {
                        fontSize: string;
                    };
                };
            };
            defaultProps: {
                size: string;
                colorScheme: string;
            };
        };
        Select: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                field: {
                    appearance: string;
                    paddingBottom: string;
                    lineHeight: string;
                    "> option, > optgroup": {
                        bg: any;
                    };
                    width: string;
                    minWidth: number;
                    outline: number;
                    position: string;
                    transitionProperty: string;
                    transitionDuration: string;
                };
                icon: {
                    width: string;
                    height: string;
                    insetEnd: string;
                    position: string;
                    color: string;
                    fontSize: string;
                    _disabled: {
                        opacity: number;
                    };
                };
            };
            sizes: any;
            variants: {
                outline: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: string;
                        _hover: {
                            borderColor: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            zIndex: number;
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: any;
                        bg: any;
                    };
                };
                filled: (props: Record<string, any>) => {
                    field: {
                        border: string;
                        borderColor: string;
                        bg: any;
                        _hover: {
                            bg: any;
                        };
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                        _invalid: {
                            borderColor: any;
                        };
                        _focus: {
                            bg: string;
                            borderColor: any;
                        };
                    };
                    addon: {
                        border: string;
                        borderColor: string;
                        bg: any;
                    };
                };
                flushed: (props: Record<string, any>) => {
                    field: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                        _readOnly: {
                            boxShadow: string;
                            userSelect: string;
                        };
                        _invalid: {
                            borderColor: any;
                            boxShadow: string;
                        };
                        _focus: {
                            borderColor: any;
                            boxShadow: string;
                        };
                    };
                    addon: {
                        borderBottom: string;
                        borderColor: string;
                        borderRadius: number;
                        px: number;
                        bg: string;
                    };
                };
                unstyled: {
                    field: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                    addon: {
                        bg: string;
                        px: number;
                        height: string;
                    };
                };
            };
            defaultProps: {
                size: string;
                variant: string;
            };
        };
        Skeleton: {
            baseStyle: (props: Record<string, any>) => {
                opacity: number;
                borderRadius: string;
                borderColor: any;
                background: any;
                animation: string;
            };
        };
        SkipLink: {
            baseStyle: (props: Record<string, any>) => {
                borderRadius: string;
                fontWeight: string;
                _focus: {
                    boxShadow: string;
                    padding: string;
                    position: string;
                    top: string;
                    insetStart: string;
                    bg: any;
                };
            };
        };
        Slider: {
            parts: string[];
            sizes: {
                lg: (props: Record<string, any>) => {
                    thumb: {
                        w: string;
                        h: string;
                    };
                    track: any;
                };
                md: (props: Record<string, any>) => {
                    thumb: {
                        w: string;
                        h: string;
                    };
                    track: any;
                };
                sm: (props: Record<string, any>) => {
                    thumb: {
                        w: string;
                        h: string;
                    };
                    track: any;
                };
            };
            baseStyle: (props: Record<string, any>) => {
                container: any;
                track: {
                    borderRadius: string;
                    bg: any;
                    _disabled: {
                        bg: any;
                    };
                };
                thumb: any;
                filledTrack: {
                    bg: any;
                };
            };
            defaultProps: {
                size: string;
                colorScheme: string;
            };
        };
        Spinner: {
            baseStyle: {
                width: string;
                height: string;
            };
            sizes: {
                xs: {
                    "--spinner-size": string;
                };
                sm: {
                    "--spinner-size": string;
                };
                md: {
                    "--spinner-size": string;
                };
                lg: {
                    "--spinner-size": string;
                };
                xl: {
                    "--spinner-size": string;
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Stat: {
            parts: string[];
            baseStyle: {
                label: {
                    fontWeight: string;
                };
                helpText: {
                    opacity: number;
                    marginBottom: number;
                };
                number: {
                    verticalAlign: string;
                    fontWeight: string;
                };
                icon: {
                    marginEnd: number;
                    w: string;
                    h: string;
                    verticalAlign: string;
                };
            };
            sizes: {
                md: {
                    label: {
                        fontSize: string;
                    };
                    helpText: {
                        fontSize: string;
                    };
                    number: {
                        fontSize: string;
                    };
                };
            };
            defaultProps: {
                size: string;
            };
        };
        Switch: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                container: {
                    "--slider-track-diff": string;
                    "--slider-thumb-x": string;
                    _rtl: {
                        "--slider-thumb-x": string;
                    };
                };
                track: {
                    borderRadius: string;
                    p: string;
                    width: string;
                    height: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    bg: any;
                    _focus: {
                        boxShadow: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    _checked: {
                        bg: any;
                    };
                };
                thumb: {
                    bg: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    borderRadius: string;
                    width: string;
                    height: string;
                    _checked: {
                        transform: string;
                    };
                };
            };
            sizes: {
                sm: {
                    container: {
                        "--slider-track-width": string;
                        "--slider-track-height": string;
                    };
                };
                md: {
                    container: {
                        "--slider-track-width": string;
                        "--slider-track-height": string;
                    };
                };
                lg: {
                    container: {
                        "--slider-track-width": string;
                        "--slider-track-height": string;
                    };
                };
            };
            defaultProps: {
                size: string;
                colorScheme: string;
            };
        };
        Table: {
            parts: string[];
            baseStyle: {
                table: {
                    fontVariantNumeric: string;
                    borderCollapse: string;
                    width: string;
                };
                th: {
                    fontFamily: string;
                    fontWeight: string;
                    textTransform: string;
                    letterSpacing: string;
                    textAlign: string;
                };
                td: {
                    textAlign: string;
                };
                caption: {
                    mt: number;
                    fontFamily: string;
                    textAlign: string;
                    fontWeight: string;
                };
            };
            variants: {
                simple: (props: Record<string, any>) => {
                    th: {
                        "&[data-is-numeric=true]": {
                            textAlign: string;
                        };
                        color: any;
                        borderBottom: string;
                        borderColor: any;
                    };
                    td: {
                        "&[data-is-numeric=true]": {
                            textAlign: string;
                        };
                        borderBottom: string;
                        borderColor: any;
                    };
                    caption: {
                        color: any;
                    };
                    tfoot: {
                        tr: {
                            "&:last-of-type": {
                                th: {
                                    borderBottomWidth: number;
                                };
                            };
                        };
                    };
                };
                striped: (props: Record<string, any>) => {
                    th: {
                        "&[data-is-numeric=true]": {
                            textAlign: string;
                        };
                        color: any;
                        borderBottom: string;
                        borderColor: any;
                    };
                    td: {
                        "&[data-is-numeric=true]": {
                            textAlign: string;
                        };
                        borderBottom: string;
                        borderColor: any;
                    };
                    caption: {
                        color: any;
                    };
                    tbody: {
                        tr: {
                            "&:nth-of-type(odd)": {
                                "th, td": {
                                    borderBottomWidth: string;
                                    borderColor: any;
                                };
                                td: {
                                    background: any;
                                };
                            };
                        };
                    };
                    tfoot: {
                        tr: {
                            "&:last-of-type": {
                                th: {
                                    borderBottomWidth: number;
                                };
                            };
                        };
                    };
                };
                unstyled: {};
            };
            sizes: {
                sm: {
                    th: {
                        px: string;
                        py: string;
                        lineHeight: string;
                        fontSize: string;
                    };
                    td: {
                        px: string;
                        py: string;
                        fontSize: string;
                        lineHeight: string;
                    };
                    caption: {
                        px: string;
                        py: string;
                        fontSize: string;
                    };
                };
                md: {
                    th: {
                        px: string;
                        py: string;
                        lineHeight: string;
                        fontSize: string;
                    };
                    td: {
                        px: string;
                        py: string;
                        lineHeight: string;
                    };
                    caption: {
                        px: string;
                        py: string;
                        fontSize: string;
                    };
                };
                lg: {
                    th: {
                        px: string;
                        py: string;
                        lineHeight: string;
                        fontSize: string;
                    };
                    td: {
                        px: string;
                        py: string;
                        lineHeight: string;
                    };
                    caption: {
                        px: string;
                        py: string;
                        fontSize: string;
                    };
                };
            };
            defaultProps: {
                variant: string;
                size: string;
                colorScheme: string;
            };
        };
        Tabs: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                root: {
                    display: string;
                };
                tab: {
                    flex: number | undefined;
                    transitionProperty: string;
                    transitionDuration: string;
                    _focus: {
                        zIndex: number;
                        boxShadow: string;
                    };
                };
                tablist: {
                    justifyContent: any;
                    flexDirection: string;
                };
                tabpanel: {
                    p: number;
                };
            };
            sizes: {
                sm: {
                    tab: {
                        py: number;
                        px: number;
                        fontSize: string;
                    };
                };
                md: {
                    tab: {
                        fontSize: string;
                        py: number;
                        px: number;
                    };
                };
                lg: {
                    tab: {
                        fontSize: string;
                        py: number;
                        px: number;
                    };
                };
            };
            variants: {
                line: (props: Record<string, any>) => {
                    tablist: {
                        [x: string]: string;
                        borderColor: string;
                    };
                    tab: {
                        [x: string]: string | {
                            color: any;
                            borderColor: string;
                            bg?: undefined;
                            opacity?: undefined;
                            cursor?: undefined;
                        } | {
                            bg: any;
                            color?: undefined;
                            borderColor?: undefined;
                            opacity?: undefined;
                            cursor?: undefined;
                        } | {
                            opacity: number;
                            cursor: string;
                            color?: undefined;
                            borderColor?: undefined;
                            bg?: undefined;
                        };
                        borderColor: string;
                        _selected: {
                            color: any;
                            borderColor: string;
                        };
                        _active: {
                            bg: any;
                        };
                        _disabled: {
                            opacity: number;
                            cursor: string;
                        };
                    };
                };
                enclosed: (props: Record<string, any>) => {
                    tab: {
                        borderTopRadius: string;
                        border: string;
                        borderColor: string;
                        mb: string;
                        _selected: {
                            color: any;
                            borderColor: string;
                            borderBottomColor: any;
                        };
                    };
                    tablist: {
                        mb: string;
                        borderBottom: string;
                        borderColor: string;
                    };
                };
                "enclosed-colored": (props: Record<string, any>) => {
                    tab: {
                        border: string;
                        borderColor: string;
                        bg: any;
                        mb: string;
                        _notLast: {
                            marginEnd: string;
                        };
                        _selected: {
                            bg: any;
                            color: any;
                            borderColor: string;
                            borderTopColor: string;
                            borderBottomColor: string;
                        };
                    };
                    tablist: {
                        mb: string;
                        borderBottom: string;
                        borderColor: string;
                    };
                };
                "soft-rounded": (props: Record<string, any>) => {
                    tab: {
                        borderRadius: string;
                        fontWeight: string;
                        color: string;
                        _selected: {
                            color: any;
                            bg: any;
                        };
                    };
                };
                "solid-rounded": (props: Record<string, any>) => {
                    tab: {
                        borderRadius: string;
                        fontWeight: string;
                        color: any;
                        _selected: {
                            color: any;
                            bg: any;
                        };
                    };
                };
                unstyled: {};
            };
            defaultProps: {
                size: string;
                variant: string;
                colorScheme: string;
            };
        };
        Tag: {
            parts: string[];
            variants: {
                subtle: (props: Record<string, any>) => {
                    container: {
                        bg: any;
                        color: any;
                    };
                };
                solid: (props: Record<string, any>) => {
                    container: {
                        bg: any;
                        color: any;
                    };
                };
                outline: (props: Record<string, any>) => {
                    container: {
                        color: any;
                        boxShadow: string;
                    };
                };
            };
            baseStyle: {
                container: {
                    fontWeight: string;
                    lineHeight: number;
                    outline: number;
                    _focus: {
                        boxShadow: string;
                    };
                };
                label: {
                    lineHeight: number;
                };
                closeButton: {
                    fontSize: string;
                    w: string;
                    h: string;
                    transitionProperty: string;
                    transitionDuration: string;
                    borderRadius: string;
                    marginStart: string;
                    marginEnd: string;
                    opacity: number;
                    _disabled: {
                        opacity: number;
                    };
                    _focus: {
                        boxShadow: string;
                        bg: string;
                    };
                    _hover: {
                        opacity: number;
                    };
                    _active: {
                        opacity: number;
                    };
                };
            };
            sizes: {
                sm: {
                    container: {
                        minH: string;
                        minW: string;
                        fontSize: string;
                        px: number;
                        borderRadius: string;
                    };
                    closeButton: {
                        marginEnd: string;
                        marginStart: string;
                    };
                };
                md: {
                    container: {
                        minH: string;
                        minW: string;
                        fontSize: string;
                        borderRadius: string;
                        px: number;
                    };
                };
                lg: {
                    container: {
                        minH: number;
                        minW: number;
                        fontSize: string;
                        borderRadius: string;
                        px: number;
                    };
                };
            };
            defaultProps: {
                size: string;
                variant: string;
                colorScheme: string;
            };
        };
        Textarea: {
            baseStyle: {
                paddingY: string;
                minHeight: string;
                lineHeight: string;
                verticalAlign: string;
                width: string;
                minWidth: number;
                outline: number;
                position: string;
                appearance: string;
                transitionProperty: string;
                transitionDuration: string;
            };
            sizes: {
                xs: {
                    fontSize: string;
                    px: number;
                    h: number;
                    borderRadius: string;
                };
                sm: {
                    fontSize: string;
                    px: number;
                    h: number;
                    borderRadius: string;
                };
                md: {
                    fontSize: string;
                    px: number;
                    h: number;
                    borderRadius: string;
                };
                lg: {
                    fontSize: string;
                    px: number;
                    h: number;
                    borderRadius: string;
                };
            };
            variants: {
                outline: (props: Record<string, any>) => {
                    border: string;
                    borderColor: string;
                    bg: string;
                    _hover: {
                        borderColor: any;
                    };
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    _invalid: {
                        borderColor: any;
                        boxShadow: string;
                    };
                    _focus: {
                        zIndex: number;
                        borderColor: any;
                        boxShadow: string;
                    };
                };
                flushed: (props: Record<string, any>) => {
                    borderBottom: string;
                    borderColor: string;
                    borderRadius: number;
                    px: number;
                    bg: string;
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _invalid: {
                        borderColor: any;
                        boxShadow: string;
                    };
                    _focus: {
                        borderColor: any;
                        boxShadow: string;
                    };
                };
                filled: (props: Record<string, any>) => {
                    border: string;
                    borderColor: string;
                    bg: any;
                    _hover: {
                        bg: any;
                    };
                    _readOnly: {
                        boxShadow: string;
                        userSelect: string;
                    };
                    _disabled: {
                        opacity: number;
                        cursor: string;
                    };
                    _invalid: {
                        borderColor: any;
                    };
                    _focus: {
                        bg: string;
                        borderColor: any;
                    };
                };
                unstyled: {
                    bg: string;
                    px: number;
                    height: string;
                };
            };
            defaultProps: {
                size: string;
                variant: string;
            };
        };
        Tooltip: {
            baseStyle: (props: Record<string, any>) => {
                "--tooltip-bg": string;
                px: string;
                py: string;
                bg: string;
                "--popper-arrow-bg": string;
                color: any;
                borderRadius: string;
                fontWeight: string;
                fontSize: string;
                boxShadow: string;
                maxW: string;
                zIndex: string;
            };
        };
        FormError: {
            parts: string[];
            baseStyle: (props: Record<string, any>) => {
                text: {
                    color: any;
                    mt: number;
                    fontSize: string;
                };
                icon: {
                    marginEnd: string;
                    color: any;
                };
            };
        };
    };
    styles: import("@chakra-ui/theme-tools").Styles;
    config: import("@chakra-ui/react").ThemeConfig;
    sizes: {
        container: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        max: string;
        min: string;
        full: string;
        "3xs": string;
        "2xs": string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
        "4xl": string;
        "5xl": string;
        "6xl": string;
        "7xl": string;
        "8xl": string;
        px: string;
        0.5: string;
        1: string;
        1.5: string;
        2: string;
        2.5: string;
        3: string;
        3.5: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        12: string;
        14: string;
        16: string;
        20: string;
        24: string;
        28: string;
        32: string;
        36: string;
        40: string;
        44: string;
        48: string;
        52: string;
        56: string;
        60: string;
        64: string;
        72: string;
        80: string;
        96: string;
    };
    shadows: {
        xs: string;
        sm: string;
        base: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        outline: string;
        inner: string;
        none: string;
        "dark-lg": string;
    };
    space: {
        px: string;
        0.5: string;
        1: string;
        1.5: string;
        2: string;
        2.5: string;
        3: string;
        3.5: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        12: string;
        14: string;
        16: string;
        20: string;
        24: string;
        28: string;
        32: string;
        36: string;
        40: string;
        44: string;
        48: string;
        52: string;
        56: string;
        60: string;
        64: string;
        72: string;
        80: string;
        96: string;
    };
    borders: {
        none: number;
        "1px": string;
        "2px": string;
        "4px": string;
        "8px": string;
    };
    transition: {
        property: {
            common: string;
            colors: string;
            dimensions: string;
            position: string;
            background: string;
        };
        easing: {
            "ease-in": string;
            "ease-out": string;
            "ease-in-out": string;
        };
        duration: {
            "ultra-fast": string;
            faster: string;
            fast: string;
            normal: string;
            slow: string;
            slower: string;
            "ultra-slow": string;
        };
    };
    letterSpacings: {
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
        wider: string;
        widest: string;
    };
    lineHeights: {
        normal: string;
        none: number;
        shorter: number;
        short: number;
        base: number;
        tall: number;
        taller: string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
    };
    fontWeights: {
        hairline: number;
        thin: number;
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
        black: number;
    };
    fonts: {
        heading: string;
        body: string;
        mono: string;
    };
    fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
        "4xl": string;
        "5xl": string;
        "6xl": string;
        "7xl": string;
        "8xl": string;
        "9xl": string;
    };
    breakpoints: import("@chakra-ui/theme-tools").Breakpoints<{
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
    }>;
    zIndices: {
        hide: number;
        auto: string;
        base: number;
        docked: number;
        dropdown: number;
        sticky: number;
        banner: number;
        overlay: number;
        modal: number;
        popover: number;
        skipLink: number;
        toast: number;
        tooltip: number;
    };
    radii: {
        none: string;
        sm: string;
        base: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
        full: string;
    };
    blur: {
        none: number;
        sm: string;
        base: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
    };
    colors: {
        transparent: string;
        current: string;
        black: string;
        white: string;
        whiteAlpha: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        blackAlpha: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        gray: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        red: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        orange: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        yellow: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        green: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        teal: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        blue: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        cyan: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        purple: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        pink: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        linkedin: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        facebook: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        messenger: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        whatsapp: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        twitter: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        telegram: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
    };
    direction: import("@chakra-ui/react").ThemeDirection;
}, [{}]>;
