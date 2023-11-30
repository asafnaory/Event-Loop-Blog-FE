import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Card.module.css";

type HrefProps = {
  as: "href";
  styles?: React.CSSProperties
  children?: ReactNode
} & ComponentPropsWithoutRef<"a">;

type ButtonProps = {
  as: "button";
  icon?: ImageMetadata
  title?: string;
  styles?: React.CSSProperties
  children?: ReactNode
}& ComponentPropsWithoutRef<"button">;;

export function Card(props: HrefProps | ButtonProps): JSX.Element {
  if (props.as === "button") {
    return (
        <button onClick={ props.onClick } style={props.styles}>
          {props.children}
        </button>
    );
  } else if (props.as === "href") {
    return (
      <a href={ props.href } className={ styles.button } style={ props.styles }>
        { props.title }
        {props.children}
      </a>
    );
  }
  else {
    const _exhaustiveCheck: never = props;
    console.log(_exhaustiveCheck);
    return <></>;
  }
}
