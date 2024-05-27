const Footer = ({length}) => {
    const today = new Date();

    return (
        <footer>
            <p> {length} list items</p>
        </footer>
    )
}

export default Footer
