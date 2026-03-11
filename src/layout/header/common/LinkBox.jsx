import Link from 'next/link';
import { useTranslation } from "react-i18next";

const LinkBox = ({ menu }) => {

    const { t } = useTranslation('common');
    return (
       <>
  {menu.status === 1 && (
    <>
      {menu.link_type === "sub" ? (
        <h5 className="dropdown-header">{menu.title}</h5>
      ) : menu.link_type === "link" && menu.is_target_blank === 0 ? (
        <Link className="dropdown-item" href={`/${menu?.path}`}>
          {menu.title}
          {menu.badge_text && (
            <label className={`menu-label ${menu.badge_color}`}>
              {menu.badge_text}
            </label>
          )}
        </Link>
      ) : (
        <Link
          href={menu.path}
          className="dropdown-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {menu.title}
          {menu.badge_text && (
            <label className={`menu-label ${menu.badge_color}`}>
              {menu.badge_text}
            </label>
          )}
        </Link>
      )}

      {menu.child && (
        <ul>
          {menu.child.map((link, i) => (
            <LinkBox menu={link} key={i} />
          ))}
        </ul>
      )}
    </>
  )}
</>

    )
};

export default LinkBox;
