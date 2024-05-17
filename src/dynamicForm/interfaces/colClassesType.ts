export interface ColClassesType {
    csscolsm?: number;
    csscolmd?: number;
    csscolxs?: number;
    cssmb?: number;//for bottpm margin
    /*mb-0: margin-bottom of 0rem (0 pixels)
    mb-1: margin-bottom of 0.25rem (4 pixels)
    mb-2: margin-bottom of 0.5rem (8 pixels)
    mb-3: margin-bottom of 1rem (16 pixels)
    mb-4: margin-bottom of 1.5rem (24 pixels)
    mb-5: margin-bottom of 3rem (48 pixels)*/
    containerclass?: string;
    controlcontainerclass?: string;
    labelclass?: string;
    
    //field starting with label will be applied to labels on control level when isLabelControlsHorizontal = true.
    //If it has labelcolsm then col-sm will be applied. It can be overriden on inidividual control levels.

    //field starting with control will be applied to Controls on control level when isLabelControlsHorizontal = true.
    //If it has controlcolsm then col-sm will be applied. It can be overriden on inidividual control levels.
    [key: string]: any;
};