

import Link from "next/link";

const FooterSalesPoints = () => {
    const salesPoints = [
        { name: 'Chotrana', id: 1, value: 'https://www.google.com/maps/place/P%C3%A2tisserie+Madame+ZARROUK+La+soukra/@36.8790585,10.2325953,663m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12e2caea2dcce671:0x97fb068114f2f2fa!8m2!3d36.8790585!4d10.2325953!16s%2Fg%2F11csbfbdw6?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoASAFQAw%3D%3D' },
        { name: 'Menzah 6', id: 2, value: 'https://www.google.com/maps/place/patisserie+madame+zarrouk+menzah+6/data=!4m2!3m1!1s0x12fd33591a3622a5:0x5257d77122758e56?sa=X&ved=1t:242&ictx=111' },
        { name: 'La Marsa', id: 3, value: 'https://www.google.com/maps/place/P%C3%A2tisserie+Madame+Zarrouk+La+marsa/data=!4m2!3m1!1s0x0:0xb59b06169e50ee4b?sa=X&ved=1t:2428&ictx=111' }
    ];

    return (
        <div className='footer-sales-points'>
            <div className='sales-points-content'>
                <ul>
                    {salesPoints.map((elem) => (
                        <li key={elem.id} className="list-none">
                            <Link href={elem.value} target="_blank" className='text-content text-capitalize'>
                                {elem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FooterSalesPoints;
