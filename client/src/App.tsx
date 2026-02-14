import {Routes,Route} from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import AdminPage from './components/AdminPage';
import ProblemPage from './components/ProblemPage';
import ParticularProblem from './components/ParticularProblem';
import AllSubmission from './components/AllSubmission';
import AllPoints from './components/AllPoints';
import ContestPage from './components/ContestPage';
import DiscussPage from './components/DiscussPage';
import SeeSolution from './components/SeeSolution';
import MyAllDiscussions from './components/MyAllDiscussions';
import ShowParticularTopicQuestion from './components/ShowParticularTopicQuestion';
import OrganizeContest from './components/OrganizeContest';
import SeeAllContest from './components/SeeAllContest';
import JoinNow from './components/JoinNow';
import ContestQuestion from './components/ContestQuestions';
import CodeVerdictContest from './components/CodeVerdictContest';
import AdminAddCodeVerdictContest from './components/AdminAddCodeVerdictContest';
import CodeVerdictJoinNow from './components/CodeVerdictJoinNow';
import CodeVerdictContestQuestion from './components/CodeVerdictContestQuestion';
import ShowAllContest from './components/ShowAllContest';
import AdminSeeAllQuestion from './components/AdminSeeAllQuestion';
import ProfilePage from './components/ProfilePage';
import SeeAllParticularSubmission from './components/SeeAllParticularSubmission';
import HomePage from './components/HomePage';
import EditProfile from './components/EditProfile';
function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<SignUpPage />}></Route>
      <Route path='/SignInPage' element={<SignInPage />}></Route>
      <Route path='/AdminPage' element={<AdminPage />}></Route>
      <Route path='/ProblemPage' element={<ProblemPage />}></Route>
      <Route path='/ParticularProblem' element={<ParticularProblem />}></Route>
      <Route path='/AllSubmission' element={<AllSubmission />}></Route>
      <Route path='/AllPoints' element={<AllPoints />}></Route>
      <Route path='/ContestPage' element={<ContestPage />}></Route>
      <Route path='/DiscussPage' element={<DiscussPage />}></Route>
      <Route path='/SeeSolution' element={<SeeSolution />}></Route>
      <Route path='/MyAllDiscussions' element={<MyAllDiscussions />}></Route>
      <Route path='/ShowParticularTopicQuestion' element={<ShowParticularTopicQuestion />}></Route>
      <Route path='/OrganizeContest' element={<OrganizeContest />}></Route>
      <Route path='/SeeAllContest' element={<SeeAllContest />}></Route>
      <Route path='/join/:contestId' element={<JoinNow />}></Route>
      <Route path='/ContestQuestion' element={<ContestQuestion />}></Route>
      <Route path='/CodeVerdictContest' element={<CodeVerdictContest />}></Route>
      <Route path='/AdminAddCodeVerdictContest' element={<AdminAddCodeVerdictContest />}></Route>
     <Route path="/verdict/join/:contestId"  element={<CodeVerdictJoinNow />}/>
     <Route path='/CodeVerdictContestQuestion' element={<CodeVerdictContestQuestion />}></Route>
     <Route path='/ShowAllContest' element={<ShowAllContest />}></Route>
     <Route path='/AdminSeeAllQuestion' element={<AdminSeeAllQuestion />}></Route>
     <Route path='/ProfilePage' element={<ProfilePage />}></Route>
     <Route path='/SeeAllParticularSubmission' element={<SeeAllParticularSubmission />}></Route>
     <Route path='/HomePage' element={<HomePage />}></Route>
     <Route path='/EditProfile' element={<EditProfile />}/>
         </Routes>
    </>
  )
}

export default App
