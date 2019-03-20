interface Hash {
    [key: string]: any;
}
interface Formable {
    get: <T>(field: string, defaultValue?: T) => T;
    set: (field: string, value: any) => void;
    reset: () => void;
}
declare const useFormable: (data?: Hash | undefined) => [Formable, Hash, Hash];
export default useFormable;
