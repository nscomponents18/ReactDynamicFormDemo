export const CONTAINER_INITIAL = 'css';
export const LABEL_INITIAL = CONTAINER_INITIAL + 'label';
export const CONTROL_INITIAL = CONTAINER_INITIAL + 'control';
export const COL = 'col';
export const DEFAULT_LABEL_FIELD = 'label';

export const CSS_FRAMEWORK: Record<string, Record<string,string | boolean | Record<string,unknown>>> = {
    bootstrap: {
        container: 'container py-2 border border-1',
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
            horizontalContainer: 'row',
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

    }
}