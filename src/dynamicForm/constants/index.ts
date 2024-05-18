import { inFraction } from "../utils/utils";

export const CONTAINER_INITIAL = 'css';
export const LABEL_INITIAL = CONTAINER_INITIAL + 'label';
export const CONTROL_INITIAL = CONTAINER_INITIAL + 'control';
export const DEFAULT_LABEL_FIELD = 'label';
export const EVALUATE_EXPRESSION_ERROR_VALUE = 'dynamicFormEvaluateExpressionError'

export const CSS_FRAMEWORK: Record<string, Record<string,string | boolean | Record<string,unknown>>> = {
    bootstrap: {
        container: '', //'container py-2 border border-1',
        cssClassInitial: 'col',
        header: {
            container: 'd-flex w-100 pt-1 mb-3',
            titleContainer: 'w-20',
            title: 'h3',
            nonTitleContainer: 'd-flex w-80 justify-content-between',
            leftSideContainer: (sideWidth: number) => 'd-flex flex-row gap-1 justify-content-start w-' + sideWidth,
            rightSideContainer: (sideWidth: number) => 'd-flex flex-row gap-1 justify-content-end w-' + sideWidth,
        },
        body: {
            container: 'row',
            horizontalAllControlsContainer: 'row',
            horizontalControlsContainer: 'form-group row',
            verticalControlsContainer: 'form-group',
            horizontalLabel: 'col-form-label',
            verticalLabel: 'form-label',
            error: 'error-message',

        },
        footer: {
            container: 'd-flex w-100 justify-content-between pt-1',
            leftSideContainer: (sideWidth: number) => 'd-flex flex-row gap-1 justify-content-start w-' + sideWidth,
            centerContainer: (sideWidth: number) => 'd-flex flex-row gap-1 justify-content-center w-' + sideWidth,
            rightSideContainer: (sideWidth: number) => 'd-flex flex-row gap-1 justify-content-end w-' + sideWidth,
        },
        control: 'form-control',
        checkBoxContinerVertical: 'form-check',
        checkBoxContinerHorizontal: 'form-check form-check-inline',
        checkBoxRadio: 'form-check-input',
        checkBoxLabel: 'form-check-label',
        label: 'form-label',
        line: 'my-4',
        miniHeader: 'mb-3',
        additionalInfo: 'text-muted',
    },
    tailwind: {
        "container": '', //"container py-2 border border-solid",
        cssClassInitial: 'grid',
        "header": {
            "container": "flex w-full pt-1 mb-3",
            "titleContainer": "w-1/5",
            "title": "text-3xl",
            "nonTitleContainer": "flex w-4/5 justify-between",
            "leftSideContainer": (sideWidth: number) => `flex flex-row gap-1 justify-start w-${(sideWidth === 100 ? 'full' : inFraction(sideWidth,100))}`,
            "rightSideContainer": (sideWidth: number) => `flex flex-row gap-1 justify-end w-${(sideWidth === 100 ? 'full' : inFraction(sideWidth,100))}`,
        },
        "body": {
            "container": "flex flex-wrap",
            "horizontalAllControlsContainer": "flex flex-wrap",
            "horizontalControlsContainer": "flex flex-wrap items-center",
            "verticalControlsContainer": "block",
            "horizontalLabel": "block mb-2",
            "verticalLabel": "block mb-2",
            "error": "mt-2 ml-0 text-red-500 text-sm",
        },
        "footer": {
            "container": "flex w-full justify-between pt-1",
            "leftSideContainer": (sideWidth: number) => `flex flex-row gap-1 justify-start w-${(sideWidth === 100 ? 'full' : inFraction(sideWidth,100))}`,
            "centerContainer": (sideWidth: number) => `flex flex-row gap-1 justify-center w-${(sideWidth === 100 ? 'full' : inFraction(sideWidth,100))}`,
            "rightSideContainer": (sideWidth: number) => `flex flex-row gap-1 justify-end w-${(sideWidth === 100 ? 'full' : inFraction(sideWidth,100))}`,
        },
        "control": "form-input",
        "checkBoxContinerVertical": "",
        "checkBoxContinerHorizontal": "inline-block mr-4",
        "checkBoxRadio": "form-check-input mr-2",
        "checkBoxLabel": "form-check-label",
        "label": "block mb-2",
        "line": "my-6",
        "miniHeader": "mb-3",
        "additionalInfo": "text-gray-500"
    }
}