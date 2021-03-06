import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row, useDocumentTitle } from "components/lib";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import ProjectModal from "screens/project-list/project-modal";
import ProjectPopover from "components/project-popover";
import UserPopover from "components/user-popover";
function AuthenticaedApp() {
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      {/* 共享router信息 */}
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <HeaderItem>
          <ButtonNoPadding type={"link"} onClick={resetRoute}>
            <SoftwareLogo
              width={"18rem"}
              color={"rgb(38,132,255)"}
            ></SoftwareLogo>
          </ButtonNoPadding>
        </HeaderItem>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <Button type={"link"} onClick={logout}>
              退出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const HeaderItem = styled.h2`
  margin-right: 3rem;
`;
const Main = styled.main`
  display: flex;
  grid-area: main;
  overflow: hidden;
`;

export default AuthenticaedApp;
