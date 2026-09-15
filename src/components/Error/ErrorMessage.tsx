import css from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  isError: boolean;
};

export function ErrorMessage({ isError }: ErrorMessageProps) {
  if (!isError) return null;
  return <p className={css.text}>There was an error, please try again...</p>;
}