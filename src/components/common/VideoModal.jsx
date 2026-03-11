"use client";
import { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { RiCloseLine, RiPlayCircleLine } from 'react-icons/ri';
import LiveImagePath from '@/utils/constants';

const VideoModal = ({ videoSrc, thumbnailSrc, height, width }) => {
    const [modal, setModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            setIsPlaying(false);
        }
    };

    const handleVideoClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            {/* Thumbnail with Play Button */}
            <div
                className="video-thumbnail-wrapper"
                onClick={toggleModal}
                style={{ cursor: 'pointer', position: 'relative' }}
            >
                <div className="banner-contain hover-effect b-left">
                    <img
                        src={LiveImagePath + thumbnailSrc || '/assets/images/fashion/banner/3.jpg'}
                        alt="Video Thumbnail"
                        height={height || 343}
                        width={width || 1524}
                        className="bg-img blur-up lazyload"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    <div className="video-play-overlay">
                        <div className="play-button-wrapper">
                            <RiPlayCircleLine className="play-icon" />
                            <span className="play-text">Regarder la vidéo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <Modal
                isOpen={modal}
                toggle={toggleModal}
                className="video-modal-wrapper"
                centered
                size="xl"
                backdrop="static"
            >
                <div className="video-modal-backdrop" onClick={toggleModal} />
                <ModalBody className="video-modal-body" onClick={handleVideoClick}>
                    <button
                        className="video-close-button"
                        onClick={toggleModal}
                        aria-label="Close video"
                    >
                        <RiCloseLine />
                    </button>
                    <div className="video-container">
                        <video
                            controls
                            autoPlay={isPlaying}
                            className="video-player"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default VideoModal;
