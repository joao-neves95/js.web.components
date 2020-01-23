
const sidenavTemplate = `
<aside>
    <nav class="nav flex-column">

        <_for let="item of navItems">
            <a class="nav-link active" href="<_> item.url </_>">
                <_> item.label </_>
            </a>
        </_for>

    </nav>
</aside>
`;
