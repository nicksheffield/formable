interface Hash {
    [key: string]: any;
}
declare const useFormable: (data?: Hash | undefined) => [<T>(field: string, defaultValue?: T | undefined) => T, (field: string, value: any) => void, Hash, Hash, () => void];
export default useFormable;
