import React from 'react'

const CardOverview = ({ topHead, title, status, message, rightNode, className, children }) => {
    return (
        <div className={`overview_info ${className}`}>
            {topHead}
            {message && status === false ? (
                <div className="topHead_status error">
                    <strong style={{ marginRight: '4px' }}>Status:</strong> {message}
                    {/* Oops! Invalid password. */}
                </div>
            ) : (
                message &&
                status === true && (
                    <div className="topHead_status success">
                        <strong style={{ marginRight: '4px' }}>Status:</strong>
                        {message}
                        {/* New password updated successfully */}
                    </div>
                )
            )}

            <div className="overview_info_title">
                <h1>{title}</h1>
                {rightNode}
            </div>
            <div className="card_overview_body">{children}</div>
        </div>
    )
}

export default CardOverview
