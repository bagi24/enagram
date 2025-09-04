import React, { useState, useRef, useEffect } from "react"; 
import styled, { keyframes } from "styled-components";
import { diffChars } from "diff";

import logo from "./images/logo.png";
import ChekMark from "./images/check.png";
import Spelling from "./images/Spelling.png";
import Mic from "./images/mic.png";
import Aling from "./images/align.png";
import PDF from "./images/pdf.png";
import Arrow from "./images/arrow-right.png";
import AddIcon from "./images/Group.png";

// Loader Component
const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
`;

const LoaderCircle = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #2563eb;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1.5s linear infinite;
  margin: 0 auto 25px;
`;

const LoaderText = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #555;
`;

const ConvertingText = styled(LoaderText)`
  font-size: 18px;
  font-weight: bold;
  color: #444;
`;

const Percentage = styled(LoaderText)`
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
  margin-top: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.percentage}%;
  height: 10px;
  background-color: #2563eb;
  border-radius: 10px;
  transition: width 0.5s ease;
`;

const Loader = ({ percentage }) => {
  return (
    <LoaderOverlay>
      <LoaderCard>
        <LoaderCircle />
        <ConvertingText>Converting... Thank you For your Patience</ConvertingText>
        <Percentage>{percentage}%</Percentage>
        <ProgressBar>
          <Progress percentage={percentage} />
        </ProgressBar>
      </LoaderCard>
    </LoaderOverlay>
  );
};

function EditableText({ value, setValue, htmlValue }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const cursorPos = range ? range.endOffset : null;

    el.innerHTML = htmlValue || value;

    if (cursorPos !== null && el.childNodes.length > 0) {
      const newRange = document.createRange();
     
      newRange.setStart(el.childNodes[0] || el, Math.min(cursorPos, (el.childNodes[0]?.textContent.length || 0)));
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }, [htmlValue, value]);

  return (
    <EditableDiv
      ref={ref}
      contentEditable
      onInput={(e) => setValue(e.currentTarget.textContent)}
    />
  );
}

function App() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [leftHtml, setLeftHtml] = useState("");
  const [rightHtml, setRightHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasContent, setHasContent] = useState(false);
  const [activeTab, setActiveTab] = useState("text-comparison");
   const [burgerOpen, setBurgerOpen] = useState(false); 

  
  useEffect(() => {
    setHasContent(left.trim().length > 0 && right.trim().length > 0);
  }, [left, right]);

  const handleCompare = () => {
    setIsLoading(true);
    setProgress(0);
    
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
   
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
   
      const diff = diffChars(left, right);

      const leftResult = diff
        .map((part) => {
          if (part.removed) return `<span style="background-color: lightcoral">${part.value}</span>`;
        
          return part.value;
        })
        .join("");

      const rightResult = diff
        .map((part) => {
          if (part.added) return `<span style="background-color: lightgreen">${part.value}</span>`;
      
          return part.value;
        })
        .join("");

      setLeftHtml(leftResult);
      setRightHtml(rightResult);
      

      setTimeout(() => setIsLoading(false), 500);
    }, 2000);
  };

  const handleClear = () => {
    setLeft("");
    setRight("");
    setLeftHtml("");
    setRightHtml("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    
  };

  return (
    <Wrapper>
      {isLoading && <Loader percentage={progress} />}
      
      <Sidebar>
        <LogoBox>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <LogoText>ENAGRAM</LogoText>
</div>
          {/* 👇 მხოლოდ მობილურზე გამოჩნდება */}
          <BurgerButton onClick={() => setBurgerOpen(!burgerOpen)}>
            ☰
          </BurgerButton>
        </LogoBox>
        <Nav mobileOpen={burgerOpen}>
          <NavItem 
            active={activeTab === "spell-check"} 
            onClick={() => handleTabChange("spell-check")}
          >
            <img src={ChekMark} alt="ChekMark" /> მართლმწერი
          </NavItem>
          <NavItem 
            active={activeTab === "text-comparison"} 
            onClick={() => handleTabChange("text-comparison")}
          >
            <img src={Spelling} alt="Spelling" /> ტექსტის შედარება
          </NavItem>
          <NavItem 
            active={activeTab === "speech-to-text"} 
            onClick={() => handleTabChange("speech-to-text")}
          >
            <img src={Mic} alt="Mic" />ხმიდან <img src={Arrow} alt="Arrow" /> ტექსტი
          </NavItem>
          <NavItem 
            active={activeTab === "text-to-speech"} 
            onClick={() => handleTabChange("text-to-speech")}
          >
            <img src={Aling} alt="Aling" />ტექსტიდან <img src={Arrow} alt="Arrow" /> ხმა
          </NavItem>
          <NavItem 
            active={activeTab === "pdf-conversion"} 
            onClick={() => handleTabChange("pdf-conversion")}
          >
            <img src={PDF} alt="PDF" />PDF კონვერტაცია
          </NavItem>
        </Nav>
        <Footer> <span>თ</span> <span>თამარ ონიანი</span> <span>...</span></Footer>
      </Sidebar>

      <Main>
        <Topbar>
          <TopbarLeft>
            <Select>
              <option>ქართული</option>
              <option>ქართული</option>
               <option>ინგლისური</option>
            </Select>
            <CheckboxLabel>
              <input type="checkbox" /> ფორმატის შენარჩუნება
            </CheckboxLabel>
          </TopbarLeft>
          <SaveBtn 
            onClick={handleClear} 
            disabled={!leftHtml && !rightHtml}
          >
            <img src={AddIcon} alt="AddIcon" />ახლის გახსნა
          </SaveBtn>
        </Topbar>

        <Content>
          {activeTab === "text-comparison" && (
            <>
              <TextCard>
                <EditableText value={left} setValue={setLeft} htmlValue={leftHtml} />
              </TextCard>

              <TextCard>
                <EditableText value={right} setValue={setRight} htmlValue={rightHtml} />
              </TextCard>
            </>
          )}
          
          {activeTab !== "text-comparison" && (
            <ComingSoon>
              <h2>{activeTab === "spell-check" && "მართლმწერის ფუნქციონალი"}
                   {activeTab === "speech-to-text" && "ხმიდან ტექსტში კონვერტაცია"}
                   {activeTab === "text-to-speech" && "ტექსტიდან ხმაში კონვერტაცია"}
                   {activeTab === "pdf-conversion" && "PDF კონვერტაცია"}</h2>
              <p>ეს ფუნქციონალი მალე დაემატება</p>
            </ComingSoon>
          )}
        </Content>

        {activeTab === "text-comparison" && (
          <Actions>
            <CompareBtn 
              onClick={handleCompare} 
              disabled={!hasContent}
            >
              ↻ შედარება
            </CompareBtn>
          </Actions>
        )}
      </Main>
    </Wrapper>
  );
}

export default App;

/* --- styled-components --- */
const BurgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 767px) {
    display: flex;
   overflow: hidden;
  }
`;


const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;

  @media (max-width: 767px) {
    flex-direction: column;
    overflow: hidden;
  
  }
`;
const Sidebar = styled.aside`
  width: 250px;
  background: #0b2c59;
  color: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    overflow: hidden;
  }
`;
const LogoBox = styled.div`display: flex; align-items: center; gap: 8px; padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); 
@media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    
  }

`;
const Logo = styled.div`border-radius: 6px; width: 42.65px; height: 44px; display: flex; align-items: center; justify-content: center; img{width:100%;height:100%;object-fit:contain;border-radius:6px;}`;
const LogoText = styled.span`font-weight: bold; font-size: 18px;`;

const Nav = styled.nav`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;

  @media (max-width: 767px) {
    display: ${(props) => (props.mobileOpen ? "flex" : "none")};
    position: absolute;
    top: 120px;   /* LogoBox-ის ქვემოთ */
    right: 8px;
   overflow: hidden;
    background: #0b2c59;
    padding: 0;
    z-index: 999;
  }
`;
const NavItem = styled.a`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 9px;

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    transition: filter 0.3s ease;
  }

  ${(props) =>
    props.active
      ? `
      background: #fff; 
      font-weight: 500; 
      border-radius: 30px 0 0 30px;
      padding: 8px 16px;
      width:100%;
      color: #000 !important;

      img {
        filter: brightness(0) saturate(100%); /* შავი ფერი */
      }
    `
      : `
      &:hover { 
        background: rgba(255,255,255,0.1); 
        color: #fff;
      }
      color: #fff;

      img {
        filter: brightness(0) invert(1); /* თეთრი ფერი */
      }
    `}
`;





const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  display: flex;
  font-family: Helvetica;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  gap: 8px;

  span:first-child {
    background-color: #9ec8ff;
    color: #132450;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span:last-child {
    margin-left: auto;
    cursor: pointer;
    font-size: 14px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
const Main = styled.div`flex:1; display:flex; flex-direction: column; background:#fff;`;
const Topbar = styled.header`display:flex; justify-content:space-between; align-items:center; padding:16px 24px; background:#fff; border-bottom:1px solid #e5e7eb;`;
const TopbarLeft = styled.div`display:flex; align-items:center; gap:12px;`;
const Select = styled.select`border:1px solid #d1d5db; border-radius:6px; padding:4px 8px; font-size:14px;`;
const CheckboxLabel = styled.label`display:flex; align-items:center; gap:6px; font-size:14px; cursor:pointer;`;
const SaveBtn = styled.button`
  background: ${props => props.disabled ? '#383A4899' : '#2563eb'};
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover {
    background: ${props => props.disabled ? '#383A4899' : '#1e40af'};
  }
`;

const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  gap: 24px;
  padding: 16px;
  flex: 1;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 52px;
    padding: 24px;
  }
`;
const TextCard = styled.div`
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 200px;

  @media (min-width: 768px) {
    min-height: 300px;
  }
`;
const EditableDiv = styled.div`
  flex: 1;
  min-height: 200px;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  background: #F0F7FF;
  border: 1px solid #F0F7FF;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  direction: ltr;
  text-align: left;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #93c5fd;
  }
`;
const Actions = styled.div`display:flex; justify-content:center; margin:24px 0; background:#fff;`;
const CompareBtn = styled.button`
  background: ${props => props.disabled ? '#383A4899' : '#2563eb'};
  color: white;
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover {
    background: ${props => props.disabled ? '#383A4899' : '#1e40af'};
  }
`;

const ComingSoon = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  background: #f0f7ff; /* დამატებით ფონზე, რომ სურათები ჩანს */
  
  h2 {
    color: #2563eb;
    margin-bottom: 16px;
  }
  
  p {
    color: #6b7280;
    font-size: 18px;
  }

  img {
    width: 80px;
    height: auto;
    object-fit: contain;
    margin-bottom: 16px;
  }
`;
