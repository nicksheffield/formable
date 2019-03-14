declare const useReducer: any, useCallback: any, useMemo: any;
interface action {
    type: string;
    key: string;
    val: any;
}
declare const initialState: {};
declare const reducer: (state: any, { type, key, val }: action) => any;
declare const useFormable: (data: any) => [<T>(field: string, defaultValue?: T | undefined) => T, (field: string, value: any) => void, object, object, () => void];
