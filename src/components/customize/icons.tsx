export interface NavItemIconProps extends React.SVGProps<SVGSVGElement> {
    meta?: React.ReactNode;
}

export interface DefaultDivProps extends React.HTMLAttributes<HTMLDivElement> {
    meta: React.ReactNode;
}


export const DHearIcon: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="302" height="453" viewBox="0 0 302 453" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M134.345 332.141C98.988 307.573 75.4054 267.795 75.4054 222.446C75.4054 145.85 141.846 86 220.859 86C242.638 86 263.403 90.5179 282.064 98.6459C300.726 90.5179 321.491 86 343.27 86C422.284 86 488.724 145.85 488.724 222.446C488.724 265.053 467.875 302.81 436.006 327.568L341.173 408.714C309.016 436.229 260.304 436.589 227.7 409.554L134.345 332.141ZM143.757 320.923C111.754 298.912 90.4865 263.157 90.4865 222.446C90.4865 154.101 149.82 100.333 220.859 100.333C242.911 100.333 263.77 105.485 282.064 114.608C300.359 105.485 321.218 100.333 343.27 100.333C414.309 100.333 473.642 154.101 473.642 222.446C473.642 260.617 454.922 294.483 426.19 316.681L331.083 398.061C304.594 420.726 264.471 421.022 237.615 398.753L143.757 320.923Z"
                  fill="#26353D"/>
            <path
                d="M132.667 223.789C132.667 250.502 146.912 274.122 168.729 288.447L261.771 365.6C272.824 374.766 289.338 374.643 300.24 365.315L393.812 285.249C413.044 270.745 425.335 248.602 425.335 223.789C425.335 180.097 387.22 144.678 340.204 144.678C316.179 144.678 294.479 153.926 279 168.801C263.522 153.926 241.822 144.678 217.796 144.678C170.781 144.678 132.667 180.097 132.667 223.789Z"
                fill="#24323A"/>
            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                  d="M214.341 257.893C233.135 257.893 248.372 242.984 248.372 224.595C248.372 206.204 233.135 191.296 214.341 191.296C195.546 191.296 180.311 206.204 180.311 224.595C180.311 242.984 195.546 257.893 214.341 257.893Z"
                  fill="white"/>
        </svg>

    )
}

export const DHeartRedIcon: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="79" height="73" viewBox="0 0 79 73" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M19.0202 46.989C14.0144 43.5134 10.6757 37.8859 10.6757 31.4702C10.6757 20.6339 20.0821 12.1667 31.2686 12.1667C34.352 12.1667 37.2918 12.8059 39.9338 13.9558C42.5759 12.8059 45.5157 12.1667 48.5991 12.1667C59.7857 12.1667 69.192 20.6339 69.192 31.4702C69.192 37.4979 66.2404 42.8395 61.7285 46.3421L48.3023 57.822C43.7495 61.7147 36.8531 61.7656 32.2371 57.9408L19.0202 46.989ZM20.3527 45.402C15.8217 42.288 12.8108 37.2297 12.8108 31.4702C12.8108 21.8011 21.211 14.1945 31.2686 14.1945C34.3906 14.1945 37.3437 14.9234 39.9338 16.214C42.524 14.9234 45.4771 14.1945 48.5991 14.1945C58.6566 14.1945 67.0569 21.8011 67.0569 31.4702C67.0569 36.8704 64.4065 41.6614 60.3387 44.8018L46.8737 56.3149C43.1235 59.5214 37.443 59.5632 33.6407 56.4129L20.3527 45.402Z"
                  fill="#26353D"/>
            <path
                d="M18.7825 31.6601C18.7825 35.4393 20.7993 38.7809 23.888 40.8074L37.0608 51.7226C38.6256 53.0193 40.9636 53.0019 42.5071 51.6822L55.7547 40.355C58.4775 38.3031 60.2176 35.1704 60.2176 31.6601C60.2176 25.4789 54.8215 20.468 48.165 20.468C44.7637 20.468 41.6914 21.7763 39.4999 23.8808C37.3087 21.7763 34.2364 20.468 30.8349 20.468C24.1786 20.468 18.7825 25.4789 18.7825 31.6601Z"
                fill="#EF5658"/>
            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                  d="M30.3458 36.4849C33.0066 36.4849 35.1637 34.3758 35.1637 31.7742C35.1637 29.1723 33.0066 27.0632 30.3458 27.0632C27.6847 27.0632 25.5278 29.1723 25.5278 31.7742C25.5278 34.3758 27.6847 36.4849 30.3458 36.4849Z"
                  fill="white"/>
        </svg>

    )
}

export const DFlagIcon: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5 18.75C5 18.75 6.25 17.5 10 17.5C13.75 17.5 16.25 20 20 20C23.75 20 25 18.75 25 18.75V3.75C25 3.75 23.75 5 20 5C16.25 5 13.75 2.5 10 2.5C6.25 2.5 5 3.75 5 3.75V18.75ZM5 18.75V27.5"
                stroke="currentcolor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const DArrowTop: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="45" height="50" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M1.72602 49.2166C1.47016 49.3519 1.22772 49.4474 1 49.5C1.24349 49.4075 1.48549 49.313 1.72602 49.2166C8.77353 45.4874 26 11.5 26 11.5H13L31 1L43.5 11.5H33.5C31.0304 20.8843 21.2424 41.3928 1.72602 49.2166Z"
                fill="#4ABEF7"/>
            <path d="M1 49.5C7.5 48 26 11.5 26 11.5H13L31 1L43.5 11.5H33.5C31 21 21 41.9 1 49.5Z" stroke="#48B2E6"/>
        </svg>
    )
}


export const DHeartGray: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="115" height="106" viewBox="0 0 115 106" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M27.6876 68.2304C20.4007 63.1837 15.5405 55.0122 15.5405 45.6963C15.5405 29.9615 29.2335 17.6667 45.5176 17.6667C50.006 17.6667 54.2856 18.5948 58.1315 20.2645C61.9775 18.5948 66.2571 17.6667 70.7455 17.6667C87.0298 17.6667 100.723 29.9615 100.723 45.6963C100.723 54.449 96.4259 62.2052 89.8579 67.2912L70.3135 83.9605C63.6861 89.613 53.6469 89.6869 46.9274 84.1331L27.6876 68.2304ZM29.6273 65.9261C23.0317 61.4043 18.6486 54.0594 18.6486 45.6963C18.6486 31.6563 30.8768 20.6111 45.5176 20.6111C50.0623 20.6111 54.3611 21.6695 58.1315 23.5435C61.902 21.6695 66.2008 20.6111 70.7455 20.6111C85.3862 20.6111 97.6145 31.6563 97.6145 45.6963C97.6145 53.5377 93.7564 60.4945 87.8348 65.0546L68.2338 81.7722C62.7748 86.4283 54.5056 86.4889 48.9707 81.9144L29.6273 65.9261Z"
                  fill="#26353D"/>
            <path
                d="M27.3417 45.9722C27.3417 51.4598 30.2776 56.3119 34.7738 59.2546L53.9493 75.1039C56.2273 76.9869 59.6306 76.9616 61.8775 75.0454L81.1621 58.5977C85.1255 55.6182 87.6586 51.0693 87.6586 45.9722C87.6586 36.9967 79.8035 29.7206 70.1137 29.7206C65.1624 29.7206 60.6902 31.6204 57.5 34.6761C54.3102 31.6204 49.8379 29.7206 44.8864 29.7206C35.1969 29.7206 27.3417 36.9967 27.3417 45.9722Z"
                fill="#24323A"/>
            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                  d="M44.1743 52.9779C48.0477 52.9779 51.1878 49.9154 51.1878 46.1377C51.1878 42.3597 48.0477 39.2971 44.1743 39.2971C40.3007 39.2971 37.1609 42.3597 37.1609 46.1377C37.1609 49.9154 40.3007 52.9779 44.1743 52.9779Z"
                  fill="white"/>
        </svg>
    )
}

//#141F25

export const DArrowGoIcon: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_98_814)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M20.5078 10.0872C19.8507 9.61981 18.5914 8.54376 17.4086 7.60772C15.2606 5.9024 15.4071 5.99947 15.1702 6.24122C14.8171 6.60149 14.7015 7.69618 14.8788 8.98501C14.9003 9.12956 14.79 9.26034 14.6439 9.26462C12.1684 9.33716 11.4478 9.42515 7.80944 9.77006C3.29894 10.2006 2.7965 10.6375 1.38518 10.7691C0.395827 10.859 0.825974 11.6243 1.87743 11.6418C3.28563 11.6651 6.16546 11.9503 8.39343 12.2844C8.77497 12.3445 11.4489 12.7 13.2774 12.9419C14.2683 13.073 14.9692 13.9164 15.027 14.9143C15.0523 15.3524 15.1157 15.4646 15.2834 15.5608C15.4015 15.63 15.4482 15.6107 15.7084 15.3547C16.5264 14.5673 19.576 12.6122 20.7016 11.6152C21.5806 10.8225 21.2358 10.6054 20.5078 10.0872ZM20.0681 11.1617C19.158 11.6543 16.9257 13.2116 16.1349 13.9048C15.9747 14.0455 15.7282 13.9115 15.7554 13.7001C15.8822 12.7136 15.7964 12.3805 14.5738 12.2264C12.7975 12.0004 7.40678 11.2525 6.88982 11.1827C5.31078 10.9734 5.31078 10.9734 6.39863 10.8779C8.30243 10.7186 12.6811 10.2797 14.4203 10.1522C14.8718 10.1192 15.4861 10.1914 15.5612 9.745C15.6 9.51426 15.6108 9.15337 15.5695 8.59317C15.5263 8.03981 15.5172 7.60343 15.5502 7.61718C15.6681 7.67699 18.7532 10.1519 19.7878 10.8219C20.1705 11.0762 20.1895 11.0947 20.0681 11.1617Z"
                      fill="currentcolor"/>
            </g>
            <defs>
                <clipPath id="clip0_98_814">
                    <rect width="14.96" height="14.96" fill="white"
                          transform="translate(10.9705 0.422241) rotate(44.4191)"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export const DFlatHeart: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M0 7.29566C0 9.75914 1.26555 11.9374 3.20368 13.2584L11.4694 20.3735C12.4513 21.2188 13.9184 21.2074 14.8869 20.3472L23.1996 12.9635C24.9081 11.6259 26 9.58386 26 7.29566C26 3.26635 22.614 0 18.4371 0C16.3029 0 14.3751 0.85284 12.9999 2.22463C11.6249 0.85284 9.69715 0 7.56276 0C3.38603 0 0 3.26635 0 7.29566Z"
                fill="#EF5658"/>
        </svg>
    )
}


export const DBook: React.FC<NavItemIconProps> = (props) => {
    return (
        <svg width="79" height="74" viewBox="0 0 79 74" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_65_623)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M39.1081 26.6212C37.6476 21.4417 34.0002 12.7798 28.2199 8.87905C27.0667 8.10084 25.7171 9.09162 25.8494 10.4826C26.1255 13.3852 26.5456 17.2727 27.042 21.6376C26.6236 21.6661 26.2028 21.7125 25.7806 21.7776L14.7979 23.4705C11.7651 23.9379 9.68308 26.7912 10.1475 29.8434L10.4279 31.6856L9.96726 31.7566C6.17627 32.3409 3.57376 35.9075 4.15438 39.7226L8.84072 70.5164C9.4213 74.3319 12.9631 76.9512 16.7541 76.3665L29.1118 74.462C36.1177 73.3821 38.1233 74.9751 40.063 76.5161C41.6102 77.7455 43.1155 78.941 47.0827 78.7213C47.2775 78.7104 47.463 78.6728 47.6368 78.6128C47.758 78.6013 47.8804 78.5774 48.0032 78.5413C50.8936 77.6891 51.9991 76.3 53.1709 74.8284C54.8399 72.7319 56.6433 70.4667 63.9317 69.3432L76.2896 67.4385C80.0802 66.8541 82.6807 63.288 82.1004 59.4727L77.377 28.4365C76.796 24.6213 73.2524 22.0021 69.4614 22.5864L69.0035 22.657L68.7231 20.8147C68.2586 17.7625 65.4235 15.6672 62.3907 16.1347L62.2777 16.1521L62.23 16.1592L51.8123 17.765L51.7345 17.7772L51.408 17.8275C45.8942 18.6774 41.5589 22.4844 39.7506 27.4006C39.5449 27.1331 39.3306 26.8732 39.1081 26.6212Z"
                      fill="#EFDEFA"/>
                <path
                    d="M77.3784 28.4365C76.7974 24.6212 73.2538 22.0021 69.4626 22.5864L56.1918 24.6319C46.0824 26.1901 39.1424 35.7009 40.6908 45.8748L45.3865 76.7308C45.5801 78.0029 46.7776 78.9027 48.0044 78.5414C55.0122 76.475 51.5281 71.2552 63.9329 69.3432C67.3831 68.8114 72.2958 68.0542 76.2903 67.4384C80.0816 66.8541 82.6821 63.2879 82.1011 59.4727L77.3784 28.4365Z"
                    fill="#CE82FF"/>
                <path
                    d="M4.15548 39.7226C3.57485 35.9073 6.17737 32.3408 9.96836 31.7564L23.2391 29.7109C33.3484 28.1528 42.7988 35.1371 44.3471 45.311L49.0429 76.167C49.2365 77.4391 48.3603 78.6504 47.0839 78.7213C38.1426 79.2171 41.7068 72.5207 29.1129 74.462C25.6626 74.9939 20.75 75.7507 16.7552 76.3665C12.9642 76.9512 9.4224 74.3319 8.84182 70.5163L4.15548 39.7226Z"
                    fill="#CE82FF"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M62.2314 16.1601C65.3493 15.6794 68.2639 17.8336 68.7415 20.9714L73.7407 53.82C74.2183 56.9578 72.0789 59.891 68.9607 60.3716L59.0463 61.8997C52.7216 62.8746 50.776 65.0502 49.1256 66.8957C48.6056 67.4773 48.1149 68.026 47.5257 68.4941C47.6916 68.1629 47.7599 67.7666 47.699 67.3669L42.7235 34.6735C42.3242 32.0493 41.2857 29.6831 39.7916 27.7107C41.6277 22.6067 46.1067 18.6455 51.8137 17.7658L62.2314 16.1601ZM44.5418 68.9548C44.9485 69.3755 45.5402 69.5664 46.125 69.3309C46.1126 69.33 46.1003 69.3289 46.0879 69.3276C45.5188 69.2689 45.0144 69.136 44.5418 68.9548Z"
                      fill="#FFC800"/>
                <path
                    d="M68.7241 20.8145C68.2596 17.7623 65.4245 15.667 62.3917 16.1344L51.409 17.8272C43.3216 19.0738 37.7695 26.6824 39.0082 34.8216L44.0545 67.9803C44.2092 68.9977 45.1745 69.7297 46.1291 69.3605C50.3223 67.7384 49.2619 63.4069 59.0525 61.8979C61.8646 61.4644 65.8765 60.846 69.1221 60.3458C72.155 59.8783 74.2348 57.0254 73.7702 53.9732L68.7241 20.8145Z"
                    fill="#EFDEFA"/>
                <path
                    d="M10.1487 29.8433C9.68421 26.7911 11.7662 23.9379 14.799 23.4704L25.7817 21.7776C33.8691 20.531 41.4294 26.1185 42.6681 34.2577L47.7143 67.4164C47.8691 68.4338 47.1724 69.4148 46.1498 69.4013C40.9176 69.3323 41.5411 64.5972 31.5948 66.1303C28.7828 66.5637 24.7708 67.1821 21.5253 67.6823C18.4925 68.1498 15.6594 66.0542 15.195 63.002L10.1487 29.8433Z"
                    fill="#EFDEFA"/>
                <path opacity="0.4" fillRule="evenodd" clipRule="evenodd"
                      d="M36.4993 24.4992L43.2302 68.7282C43.7632 68.9878 44.3459 69.1953 45.0421 69.3083C45.3367 69.4455 45.6706 69.4872 46.0086 69.3984C46.0371 69.3992 46.0657 69.3999 46.0946 69.4005C46.6658 69.4115 47.1386 69.1184 47.4258 68.6806C47.8993 68.3547 48.2983 67.9831 48.6763 67.5842L41.9911 23.6558C41.0663 24.8838 40.3247 26.2507 39.7995 27.7112C38.8633 26.4746 37.7481 25.3929 36.4993 24.4992Z"
                      fill="#DDA7FF"/>
                <path opacity="0.8"
                      d="M27.4983 21.5519L33.6698 23.2312L42.7106 62.8244C42.7106 62.8244 44.6571 69.2692 43.4326 68.8527C42.2081 68.4362 40.6169 66.9202 39.0538 66.3996C37.4906 65.8791 35.476 65.8069 35.476 65.8069L25.3535 66.861L23.9439 59.4317L20.5161 22.8892L27.4983 21.5519Z"
                      fill="#DDA7FF"/>
                <path
                    d="M28.2208 8.87857C34.4866 13.1071 38.2462 22.9301 39.4307 27.8474C40.6402 36.4919 43.4601 56.9366 45.0639 69.5602C43.8595 63.2655 36.0105 55.3969 31.6008 53.2229C30.9063 52.8805 30.3507 52.2518 30.2539 51.4796C28.7488 39.4603 26.6805 20.202 25.835 10.4813C25.7139 9.08933 27.0676 8.10037 28.2208 8.87857Z"
                    fill="#EFDEFA"/>
            </g>
            <defs>
                <clipPath id="clip0_65_623">
                    <rect width="79" height="73" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
            </defs>
        </svg>

    )
}

export const DCloseIcon: React.FC<NavItemIconProps> = (props) => {

    return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.2 21.375L5.625 19.8L11.925 13.5L5.625 7.2L7.2 5.625L13.5 11.925L19.8 5.625L21.375 7.2L15.075 13.5L21.375 19.8L19.8 21.375L13.5 15.075L7.2 21.375Z"
                fill="#B7B5BA"/>
        </svg>
    )
}

export const DXPIcon: React.FC<NavItemIconProps> = ({...props}) => {

    return (
        <svg
            width="192"
            height="192"
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M111.729 38.1893C111.139 28.7061 99.1386 24.9817 93.2824 32.4638L45.0835 94.0459C40.6259 99.7413 43.2491 108.136 50.1566 110.28L75.8909 118.267L78.253 156.195C78.8435 165.678 90.8435 169.402 96.6997 161.921L144.899 100.338C149.357 94.643 146.733 86.2478 139.826 84.104L114.092 76.1169L111.729 38.1893Z"
                  fill="#FFD900"/>
            <path
                d="M53.7251 102.782C51.385 102.05 51.2846 98.7759 53.5754 97.9028L71.9524 90.8987C73.6116 90.2664 75.3993 91.4583 75.4538 93.2331L75.8487 106.102C75.9029 107.877 74.1918 109.175 72.4969 108.646L53.7251 102.782Z"
                fill="#F7C100"/>
            <path
                d="M137.175 90.3741C139.515 91.1054 139.616 94.3799 137.325 95.253L118.948 102.257C117.289 102.889 115.501 101.698 115.446 99.9227L115.052 87.0541C114.997 85.2793 116.709 83.9804 118.404 84.5099L137.175 90.3741Z"
                fill="#FFEF8F"/>
        </svg>
    )
}

export const DMisteryBoxIcon: React.FC<NavItemIconProps> = ({...props}) => {

    return (
        <svg width="86" height="81" viewBox="0 0 86 81" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_64_1311)">
                <path d="M10.4243 7.83862H75.5758V73.1612H10.4243V7.83862Z" fill="#AA572A"/>
                <path
                    d="M2.60606 0H15.6364C16.3275 0 16.9904 0.275287 17.4791 0.765302C17.9679 1.25532 18.2424 1.91992 18.2424 2.6129V81H2.60606C1.91489 81 1.25203 80.7247 0.763297 80.2347C0.274566 79.7447 0 79.0801 0 78.3871V2.6129C0 1.91992 0.274566 1.25532 0.763297 0.765302C1.25203 0.275287 1.91489 0 2.60606 0ZM70.3636 0H83.3939C84.0851 0 84.748 0.275287 85.2367 0.765302C85.7254 1.25532 86 1.91992 86 2.6129V78.3871C86 79.0801 85.7254 79.7447 85.2367 80.2347C84.748 80.7247 84.0851 81 83.3939 81H67.7576V2.6129C67.7576 1.91992 68.0321 1.25532 68.5209 0.765302C69.0096 0.275287 69.6725 0 70.3636 0Z"
                    fill="#E5AE7C"/>
                <path
                    d="M10.4243 70.5483H75.5758V80.9999H10.4243V70.5483ZM10.4243 36.5806H75.5758V52.258H10.4243V36.5806Z"
                    fill="#E5AE7C"/>
                <path
                    d="M33.8789 28.7419H52.1213C53.5036 28.7419 54.8294 29.2925 55.8068 30.2725C56.7843 31.2526 57.3334 32.5818 57.3334 33.9677V54.871C57.3334 56.2569 56.7843 57.5861 55.8068 58.5662C54.8294 59.5462 53.5036 60.0968 52.1213 60.0968H33.8789C32.4965 60.0968 31.1708 59.5462 30.1933 58.5662C29.2159 57.5861 28.6667 56.2569 28.6667 54.871V33.9677C28.6667 32.5818 29.2159 31.2526 30.1933 30.2725C31.1708 29.2925 32.4965 28.7419 33.8789 28.7419Z"
                    fill="#E5AE7C"/>
                <path
                    d="M39.091 45.6736H46.9092L48.5719 51.5448C48.6819 51.9335 48.7005 52.3424 48.6262 52.7395C48.552 53.1367 48.3869 53.5111 48.1439 53.8334C47.901 54.1558 47.5868 54.4172 47.226 54.5973C46.8653 54.7773 46.4678 54.871 46.0648 54.871H39.9354C39.5324 54.871 39.1349 54.7773 38.7742 54.5973C38.4134 54.4172 38.0992 54.1558 37.8563 53.8334C37.6133 53.5111 37.4482 53.1367 37.374 52.7395C37.2997 52.3424 37.3183 51.9335 37.4283 51.5448L39.091 45.6736Z"
                    fill="#C07F41"/>
                <path
                    d="M43 33.9678C44.7279 33.9678 46.3851 34.656 47.6069 35.881C48.8287 37.1061 49.5152 38.7676 49.5152 40.5C49.5152 42.2325 48.8287 43.894 47.6069 45.119C46.3851 46.3441 44.7279 47.0323 43 47.0323C41.2721 47.0323 39.6149 46.3441 38.3931 45.119C37.1713 43.894 36.4849 42.2325 36.4849 40.5C36.4849 38.7676 37.1713 37.1061 38.3931 35.881C39.6149 34.656 41.2721 33.9678 43 33.9678Z"
                    fill="#C07F41"/>
            </g>
            <defs>
                <clipPath id="clip0_64_1311">
                    <rect width="86" height="81" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}

export const DSettingsIcon: React.FC<NavItemIconProps> = ({...props}) => {

    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.7917 25.6667L10.325 21.9334C10.0722 21.8362 9.83405 21.7195 9.61044 21.5834C9.38683 21.4473 9.16808 21.3014 8.95419 21.1459L5.48336 22.6042L2.27502 17.0625L5.27919 14.7875C5.25975 14.6514 5.25002 14.5202 5.25002 14.3938V13.6063C5.25002 13.4799 5.25975 13.3487 5.27919 13.2125L2.27502 10.9375L5.48336 5.39587L8.95419 6.85421C9.16808 6.69865 9.39169 6.55282 9.62502 6.41671C9.85836 6.2806 10.0917 6.16393 10.325 6.06671L10.7917 2.33337H17.2084L17.675 6.06671C17.9278 6.16393 18.166 6.2806 18.3896 6.41671C18.6132 6.55282 18.832 6.69865 19.0459 6.85421L22.5167 5.39587L25.725 10.9375L22.7209 13.2125C22.7403 13.3487 22.75 13.4799 22.75 13.6063V14.3938C22.75 14.5202 22.7306 14.6514 22.6917 14.7875L25.6959 17.0625L22.4875 22.6042L19.0459 21.1459C18.832 21.3014 18.6084 21.4473 18.375 21.5834C18.1417 21.7195 17.9084 21.8362 17.675 21.9334L17.2084 25.6667H10.7917ZM12.8334 23.3334H15.1375L15.5459 20.2417C16.1486 20.0862 16.7077 19.8577 17.2229 19.5563C17.7382 19.2549 18.2097 18.8903 18.6375 18.4625L21.525 19.6584L22.6625 17.675L20.1542 15.7792C20.2514 15.507 20.3195 15.2202 20.3584 14.9188C20.3972 14.6174 20.4167 14.3112 20.4167 14C20.4167 13.6889 20.3972 13.3827 20.3584 13.0813C20.3195 12.7799 20.2514 12.4931 20.1542 12.2209L22.6625 10.325L21.525 8.34171L18.6375 9.56671C18.2097 9.11949 17.7382 8.74518 17.2229 8.44379C16.7077 8.1424 16.1486 7.91393 15.5459 7.75837L15.1667 4.66671H12.8625L12.4542 7.75837C11.8514 7.91393 11.2924 8.1424 10.7771 8.44379C10.2618 8.74518 9.7903 9.10976 9.36252 9.53754L6.47502 8.34171L5.33752 10.325L7.84586 12.1917C7.74864 12.4834 7.68058 12.775 7.64169 13.0667C7.6028 13.3584 7.58336 13.6695 7.58336 14C7.58336 14.3112 7.6028 14.6125 7.64169 14.9042C7.68058 15.1959 7.74864 15.4875 7.84586 15.7792L5.33752 17.675L6.47502 19.6584L9.36252 18.4334C9.7903 18.8806 10.2618 19.2549 10.7771 19.5563C11.2924 19.8577 11.8514 20.0862 12.4542 20.2417L12.8334 23.3334ZM14.0584 18.0834C15.1861 18.0834 16.1486 17.6848 16.9459 16.8875C17.7431 16.0903 18.1417 15.1278 18.1417 14C18.1417 12.8723 17.7431 11.9098 16.9459 11.1125C16.1486 10.3153 15.1861 9.91671 14.0584 9.91671C12.9111 9.91671 11.9438 10.3153 11.1563 11.1125C10.3688 11.9098 9.97502 12.8723 9.97502 14C9.97502 15.1278 10.3688 16.0903 11.1563 16.8875C11.9438 17.6848 12.9111 18.0834 14.0584 18.0834Z"
                fill="white" fillOpacity="0.8"/>
        </svg>
    )
}

export const LowLevelIcon: React.FC<NavItemIconProps> = ({...props}) => {

    return (
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.9564 6.88932L18.088 2.75771C21.8594 -1.01386 28.0857 -0.903084 31.9944 3.0057C35.9031 6.91449 36.0138 13.1396 32.2424 16.9124L21.8028 27.3522C21.6272 27.5279 21.4176 27.6659 21.1869 27.7578C20.9562 27.8498 20.7092 27.8939 20.4609 27.8873L15.1398 27.7488C15.0889 27.7472 15.0382 27.7559 14.9908 27.7745C14.9434 27.7932 14.9003 27.8212 14.8641 27.857C14.8286 27.8937 14.8008 27.937 14.7821 27.9845C14.7634 28.0319 14.7543 28.0826 14.7552 28.1336C14.7562 28.1845 14.7672 28.2348 14.7876 28.2816C14.808 28.3283 14.8374 28.3706 14.8741 28.4059L17.1652 30.697C17.3364 30.8686 17.4326 31.1011 17.4326 31.3435C17.4326 31.5859 17.3364 31.8183 17.1652 31.9899L15.3185 33.8367C14.8423 34.3074 14.2562 34.652 13.6133 34.8393C12.9704 35.0265 12.2909 35.0506 11.6364 34.9092L2.07551 32.924L0.0903226 23.3616C0.0506473 22.7072 -0.0262908 22.0279 0.161191 21.3852C0.348672 20.7425 0.693367 20.1567 1.16411 19.6807L9.32895 11.5157C9.50057 11.3441 9.73332 11.2477 9.97599 11.2477C10.2187 11.2477 10.4514 11.3441 10.623 11.5157L12.9015 13.7942C12.9369 13.831 12.9791 13.8604 13.0259 13.8808C13.0726 13.9012 13.1229 13.9122 13.1739 13.9131C13.2249 13.914 13.2755 13.9049 13.323 13.8862C13.3704 13.8676 13.4137 13.8397 13.4504 13.8043C13.4864 13.7682 13.5147 13.7251 13.5336 13.6777C13.5524 13.6303 13.5614 13.5796 13.5599 13.5286L13.4214 8.22875C13.4089 7.72772 13.6015 7.24306 13.9564 6.88806V6.88932Z"
                fill="#92A8BA"/>
        </svg>

    )
}

export const DChevronLeft: React.FC<NavItemIconProps> = ({...props}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}

export const DExplainIcon: React.FC<NavItemIconProps> = ({...props}) => {
    return (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="2" y="2.5" width="19" height="19" rx="9.5" stroke="#42E1B1" strokeWidth="4"/>
        </svg>

    )
}

export const DGuardIcon: React.FC<NavItemIconProps> = ({...props}) => {
    return (
        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_501_1545)">
                <path
                    d="M1.87228 1.19234H9.12792C10.1615 1.19234 11 2.01891 11 3.0383V7.42278C11 10.2269 8.69477 12.5 5.85096 12.5H5.14925C2.30523 12.5 0 10.2269 0 7.42298V3.03851C0 2.01891 0.838283 1.19234 1.87228 1.19234Z"
                    fill="#AAC1D4"/>
                <path
                    d="M1.87228 1.19234H9.12792C10.1615 1.19234 11 2.01891 11 3.0383V5.92278C11 8.53552 8.85189 10.6536 6.20213 10.6536H4.79787C2.14811 10.6538 0 8.53593 0 5.92298V3.03851C0 2.01891 0.838283 1.19234 1.87228 1.19234Z"
                    fill="#C2D1DD"/>
                <path
                    d="M6.73323 1.19234H9.12791C10.1615 1.19234 11 2.01891 11 3.0383V4.16508L3.01046 12.0426C2.17234 11.6634 1.45279 11.0717 0.926191 10.3287C0.399594 9.58572 0.0850697 8.71837 0.0151367 7.81634L6.73323 1.19234Z"
                    fill="#BFD0DE"/>
                <path
                    d="M6.73332 1.19234H9.128C10.1616 1.19234 11.0001 2.01891 11.0001 3.0383V4.16508L3.92604 11.1399C2.74427 10.7295 1.96347 10.3005 1.58387 9.85349C1.20447 9.40624 0.879247 8.53227 0.608398 7.23139L6.73332 1.19234Z"
                    fill="#D1DCE5"/>
                <path
                    d="M1.87228 1.65383C1.48458 1.65383 1.17015 1.9638 1.17015 2.34617V6.73085C1.17015 8.89736 2.95153 10.6538 5.14883 10.6538H5.85096C8.04847 10.6538 9.82964 8.89736 9.82964 6.73085V2.34617C9.82964 1.9638 9.51542 1.65383 9.12772 1.65383H1.87228ZM1.87228 0.5H9.12792C10.1615 0.5 11 1.32658 11 2.34617V6.73085C11 9.53458 8.69477 11.8077 5.85096 11.8077H5.14925C2.30523 11.8077 0 9.53458 0 6.73085V2.34617C0 1.32658 0.838283 0.5 1.87228 0.5Z"
                    fill="#D6E4EF"/>
                <path
                    d="M1.17 6.67756V6.73085C1.17 8.67119 2.59897 10.2826 4.47581 10.5979L3.51383 11.5465C1.78434 10.9758 0.46372 9.52441 0.100098 7.73254L1.17 6.67756ZM9.8297 5.31892V2.34617C9.8297 1.9638 9.51527 1.65383 9.12757 1.65383H6.26508L7.43523 0.5H9.12757C10.1614 0.5 10.9999 1.32658 10.9999 2.34617V4.16508L9.8297 5.31892Z"
                    fill="#E0EAF3"/>
            </g>
            <defs>
                <clipPath id="clip0_501_1545">
                    <rect width="11" height="12" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
            </defs>
        </svg>

    )
}

export const DBookIcon: React.FC<NavItemIconProps> = ({...props}) => {
    return (
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_367_486)">
                <path
                    d="M0.027832 7.04793C0.027832 5.98632 0.88843 5.12573 1.95003 5.12573H4.51296C5.57455 5.12573 6.43516 5.98632 6.43516 7.04793C6.43516 8.10953 5.57455 8.97013 4.51296 8.97013H1.95003C0.88843 8.97013 0.027832 8.10953 0.027832 7.04793Z"
                    fill="white" fillOpacity="0.05"/>
                <path
                    d="M0.027832 17.2999C0.027832 16.2382 0.88843 15.3777 1.95003 15.3777H4.51296C5.57455 15.3777 6.43516 16.2382 6.43516 17.2999C6.43516 18.3614 5.57455 19.222 4.51296 19.222H1.95003C0.88843 19.222 0.027832 18.3614 0.027832 17.2999Z"
                    fill="white" fillOpacity="0.05"/>
                <path
                    d="M0.027832 27.5513C0.027832 26.4896 0.88843 25.629 1.95003 25.629H4.51296C5.57455 25.629 6.43516 26.4896 6.43516 27.5513C6.43516 28.6128 5.57455 29.4735 4.51296 29.4735H1.95003C0.88843 29.4735 0.027832 28.6128 0.027832 27.5513Z"
                    fill="white" fillOpacity="0.05"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M3.87231 5.12594V8.97033H4.51309C5.57469 8.97033 6.43529 8.10973 6.43529 7.04814C6.43529 5.98653 5.57469 5.12594 4.51309 5.12594H3.87231ZM4.51309 2.56301H4.51138C5.3702 1.03348 7.0078 0 8.88679 0H29.7696C32.5391 0 34.7841 2.24506 34.7841 5.01448V29.5851C34.7841 32.3544 32.5391 34.5995 29.7696 34.5995H8.88679C7.00785 34.5995 5.37027 33.5662 4.51144 32.0367H4.51306C6.99013 32.0367 8.9982 30.0285 8.9982 27.5516C8.9982 25.0744 6.99013 23.0665 4.51306 23.0665H3.87231V21.785H4.51306C6.99013 21.785 8.9982 19.777 8.9982 17.2999C8.9982 14.8229 6.99013 12.8148 4.51306 12.8148H3.87231V11.5333H4.51309C6.99016 11.5333 8.99821 9.52521 8.99821 7.04814C8.99821 4.57107 6.99016 2.56301 4.51309 2.56301ZM4.51306 29.4736H3.87231V25.6293H4.51306C5.57467 25.6293 6.43526 26.4899 6.43526 27.5516C6.43526 28.6131 5.57467 29.4736 4.51306 29.4736ZM4.51306 19.2221H3.87231V15.3778H4.51306C5.57467 15.3778 6.43526 16.2384 6.43526 17.2999C6.43526 18.3616 5.57467 19.2221 4.51306 19.2221ZM14.4444 5.76659C13.5598 5.76659 12.8426 6.48375 12.8426 7.36842C12.8426 8.25309 13.5598 8.97025 14.4444 8.97025H27.8999C28.7845 8.97025 29.5017 8.25309 29.5017 7.36842C29.5017 6.48375 28.7845 5.76659 27.8999 5.76659H14.4444ZM12.8426 15.0571C12.8426 14.1725 13.5598 13.4554 14.4444 13.4554H27.8999C28.7845 13.4554 29.5017 14.1725 29.5017 15.0571C29.5017 15.9419 28.7845 16.659 27.8999 16.659H14.4444C13.5598 16.659 12.8426 15.9419 12.8426 15.0571ZM14.4444 21.1442C13.5598 21.1442 12.8426 21.8613 12.8426 22.7461C12.8426 23.6307 13.5598 24.3479 14.4444 24.3479H24.0554C24.94 24.3479 25.6572 23.6307 25.6572 22.7461C25.6572 21.8613 24.94 21.1442 24.0554 21.1442H14.4444Z"
                      fill="white" fillOpacity="0.05"/>
            </g>
            <defs>
                <clipPath id="clip0_367_486">
                    <rect width="35" height="35" fill="white"/>
                </clipPath>
            </defs>
        </svg>)

}

export const HardLevelIcon: React.FC<NavItemIconProps> = ({...props}) => {

    return (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_367_458)">
                <mask id="mask0_367_458" maskUnits="userSpaceOnUse" x="0" y="0" width="46"
                      height="46">
                    <path d="M46 0H0V46H46V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_367_458)">
                    <path d="M18.4199 25.0669L27.0802 20.0669" stroke="#AFAFAF" strokeWidth="3"/>
                    <path
                        d="M30.0081 9.13881C28.7655 6.9865 26.0133 6.24906 23.861 7.4917C21.7087 8.73434 20.9712 11.4865 22.2139 13.6388L30.7139 28.3612C31.9565 30.5136 34.7087 31.251 36.861 30.0084C39.0133 28.7657 39.7507 26.0136 38.5081 23.8612L30.0081 9.13881Z"
                        fill="#1CB0F6"/>
                    <path
                        d="M15.2864 17.6388C14.0438 15.4865 11.2916 14.7491 9.1393 15.9917C6.98699 17.2343 6.24955 19.9865 7.49219 22.1388L15.9922 36.8612C17.2348 39.0136 19.987 39.751 22.1393 38.5084C24.2916 37.2657 25.0291 34.5136 23.7864 32.3612L15.2864 17.6388Z"
                        fill="#1CB0F6"/>
                    <path
                        d="M38.0706 9.10292C36.828 6.95061 34.0758 6.21317 31.9235 7.45581C29.7712 8.69845 29.0337 11.4506 30.2764 13.6029L34.7764 21.3972C36.019 23.5495 38.7712 24.2869 40.9235 23.0443C43.0758 21.8016 43.8132 19.0495 42.5706 16.8972L38.0706 9.10292Z"
                        fill="#1CB0F6"/>
                    <path
                        d="M11.2239 24.6029C9.98128 22.4506 7.22912 21.7132 5.0768 22.9558C2.92448 24.1985 2.18705 26.9506 3.42969 29.1029L7.92969 36.8972C9.17233 39.0495 11.9245 39.7869 14.0768 38.5443C16.2291 37.3016 16.9666 34.5495 15.7239 32.3972L11.2239 24.6029Z"
                        fill="#1CB0F6"/>
                    <path opacity="0.3"
                          d="M8.52776 26.0048C8.11355 25.2874 7.19616 25.0416 6.47873 25.4558C5.76129 25.87 5.51547 26.7874 5.92969 27.5048L6.92969 29.2369C7.3439 29.9543 8.26129 30.2002 8.97873 29.7859C9.69616 29.3717 9.94198 28.4543 9.52776 27.7369L8.52776 26.0048Z"
                          fill="white"/>
                    <path opacity="0.3"
                          d="M36.5278 11.0048C36.1136 10.2874 35.1962 10.0416 34.4787 10.4558C33.7613 10.87 33.5155 11.7874 33.9297 12.5048L34.9297 14.2369C35.3439 14.9543 36.2613 15.2002 36.9787 14.7859C37.6962 14.3717 37.942 13.4543 37.5278 12.7369L36.5278 11.0048Z"
                          fill="white"/>
                    <path opacity="0.3"
                          d="M12.5278 19.0048C12.1136 18.2874 11.1962 18.0416 10.4787 18.4558C9.76129 18.87 9.51547 19.7874 9.92969 20.5048L11.4297 23.1029C11.8439 23.8204 12.7613 24.0662 13.4787 23.652C14.1962 23.2377 14.442 22.3204 14.0278 21.6029L12.5278 19.0048Z"
                          fill="white"/>
                    <path opacity="0.3"
                          d="M27.5278 11.0048C27.1136 10.2874 26.1962 10.0416 25.4787 10.4558C24.7613 10.87 24.5155 11.7874 24.9297 12.5048L26.4297 15.1029C26.8439 15.8204 27.7613 16.0662 28.4787 15.652C29.1962 15.2377 29.442 14.3204 29.0278 13.6029L27.5278 11.0048Z"
                          fill="white"/>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_367_458">
                    <rect width="46" height="46" fill="white"/>
                </clipPath>
            </defs>
        </svg>


    )
}
