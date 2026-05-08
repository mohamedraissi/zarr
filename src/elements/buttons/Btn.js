import { Button, Spinner } from "reactstrap";

import { useTranslation } from "react-i18next";

const Btn = (props) => {

  const { t } = useTranslation('common');
  const { loading, title, children, ...rest } = props;
  return (
    <Button {...rest} disabled={Boolean(rest.disabled || loading)}>
      {loading ?
        <div className={`d-flex align-items-center justify-content-center gap-2`}>
          <Spinner size="sm" />
          {children}
        </div> :
        <>
          {children}
          {t(title)}
        </>
      }
    </Button>
  );
};
export default Btn;
