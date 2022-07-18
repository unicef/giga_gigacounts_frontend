import styled from 'styled-components/macro'

export const SchoolsTabContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;

    & > :nth-child(even) {
        background-color: var(--color-lightest-grey);
    }


    .school {
        width: 100%;
        display: grid;
        grid-template-columns: min-content auto 70px 140px 70px min-content;
        align-items: center;
        padding: 9px 14px;
        gap: 0 6px;
    }
`
