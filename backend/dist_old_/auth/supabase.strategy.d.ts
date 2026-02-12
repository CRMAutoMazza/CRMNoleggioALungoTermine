declare const SupabaseStrategy_base: new (...args: any) => any;
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
