import { useState, useEffect } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) delete result[key];
  });
  return result;
};

export const useMount = (callback: Function): void => {
  useEffect(() => {
    callback();
    // TODO; 依赖项里加上callback会无限循环， 这个跟useCallBack 和useMemo有关
    // 这里加上callback 并没有必要。
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
/**
 *
 * @param {*} value
 * @param {*} delay
 * @description 防抖,最后只执行一次，应用场景。
 * @description 泛型规范
 * @returns
 */
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <A>(initialArray: A[]): any => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: A) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
export const resetRoute = () => (window.location.href = window.location.origin);