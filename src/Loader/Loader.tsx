import css from "./Loader.module.css";

type LoaderProps = {
  isLoading: boolean;
};

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null;
  return <p className={css.text}>Loading movies, please wait...</p>;
}