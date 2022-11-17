import React, { useState } from 'react';
import {Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav, NavItem,NavLink,Button,Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const EmployeeDetailsData = () => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };
    
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const toggle1 = () => {
        setModal1(!modal1);
      };
    
      const toggle2 = () => {
        setModal2(!modal2);
      };
    
      const toggle3 = () => {
        setModal3(!modal3);
      };
    
      const toggle4 = () => {
        setModal4(!modal4);
      };
      
  return (
    <>
    <BreadCrumbs />
      
    <Row>
        <Col md="12">
          <ComponentCard title="Employee Details">
            <Button type="submit" className="btn btn-success mr-2">Save</Button>&nbsp;&nbsp;
            <Button type="submit" className="btn btn-info mr-2">Apply</Button>&nbsp;&nbsp;
            <Button type="submit" className="btn btn-danger mr-2">Back to List</Button>&nbsp;&nbsp;
          </ComponentCard>
        </Col>
    </Row>
             <Form>
                <FormGroup>
                <ComponentCard title="Personal Information">
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Code</Label>
                        <Input type="text" placeholder='EMP-1002'/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Full Name *</Label>
                        <Input type="text"  />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Salutation</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option value="Mr">Mr</option>
                            <option selected="selected" value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Gender *</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option selected="selected" value="Female">Female</option>
                            <option value="Male">Male</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Status</Label>
                        <Input type="select">
                            <option value="Archive">Archive</option>
                            <option selected="selected" value="Current">Current</option>
                            <option value="Cancel">Cancel</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Date of Birth *</Label>
                        <Input type="date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Passport No</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Passport Expiry</Label>
                            <Input type="date"/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Marital Status</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option selected="selected" value="Married">Married</option>
                            <option value="Single">Single</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Nationality *</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option value="AFGHAN">AFGHAN</option>
                            <option value="ALBANIAN">ALBANIAN</option>
                            <option value="ALGERIAN">ALGERIAN</option>
                            <option value="AMERICAN">AMERICAN</option>
                            <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                            <option value="ANDORRAN">ANDORRAN</option>
                            <option value="ANGOLAN">ANGOLAN</option>
                            <option value="ANGUILLA">ANGUILLA</option>
                            <option value="ANTARCTICA">ANTARCTICA</option>
                            <option value="ANTIGUA">ANTIGUA</option>
                            <option value="ARGENTINIAN">ARGENTINIAN</option>
                            <option value="ARMENIAN">ARMENIAN</option>
                            <option value="ARUBA">ARUBA</option>
                            <option value="AUSTRALIAN">AUSTRALIAN</option>
                            <option value="AUSTRIAN">AUSTRIAN</option>
                            <option value="AZERBAIJANI">AZERBAIJANI</option>
                            <option value="BAHAMAS">BAHAMAS</option>
                            <option value="BAHRAINI">BAHRAINI</option>
                            <option value="BANGLADESHI">BANGLADESHI</option>
                            <option value="BARBADOS">BARBADOS</option>
                            <option value="BELARUSSIAN">BELARUSSIAN</option>
                            <option value="BELGIAN">BELGIAN</option>
                            <option value="BELIZE">BELIZE</option>
                            <option value="BENIN">BENIN</option>
                            <option value="BERMUDAN">BERMUDAN</option>
                            <option value="BHUTAN">BHUTAN</option>
                            <option value="BOLIVIAN">BOLIVIAN</option>
                            <option value="BOSNIAN">BOSNIAN</option>
                            <option value="BOTSWANA">BOTSWANA</option>
                            <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                            <option value="BR NAT. OVERSEAS">BR NAT. OVERSEAS</option>
                            <option value="BR OVERSEAS CIT.">BR OVERSEAS CIT.</option>
                            <option value="BR PROTECTED PERS.">BR PROTECTED PERS.</option>
                            <option value="BRAZILIAN">BRAZILIAN</option>
                            <option value="BRITISH">BRITISH</option>
                            <option value="BRITISH DEPENDENT TERR CITIZEN">BRITISH DEPENDENT TERR CITIZEN</option>
                            <option value="BRITISH INDIAN OCEAN">BRITISH INDIAN OCEAN</option>
                            <option value="BRITISH SUBJECT">BRITISH SUBJECT</option>
                            <option value="BRITISH VIRGIN ISLND">BRITISH VIRGIN ISLND</option>
                            <option value="BRUNEIAN">BRUNEIAN</option>
                            <option value="BULGARIAN">BULGARIAN</option>
                            <option value="BURKINA FASO">BURKINA FASO</option>
                            <option value="BURUNDI">BURUNDI</option>
                            <option value="CAMBODIAN">CAMBODIAN</option>
                            <option value="CAMEROON">CAMEROON</option>
                            <option value="CANADIAN">CANADIAN</option>
                            <option value="CAPE VERDE">CAPE VERDE</option>
                            <option value="CAYMANESE">CAYMANESE</option>
                            <option value="CENTRAL AFRICAN REP">CENTRAL AFRICAN REP</option>
                            <option value="CHADIAN">CHADIAN</option>
                            <option value="CHILEAN">CHILEAN</option>
                            <option value="CHINESE">CHINESE</option>
                            <option value="CHRISTMAS ISLANDS">CHRISTMAS ISLANDS</option>
                            <option value="COCOS KEELING ISLAND">COCOS KEELING ISLAND</option>
                            <option value="COLOMBIAN">COLOMBIAN</option>
                            <option value="COMOROS">COMOROS</option>
                            <option value="CONGO">CONGO</option>
                            <option value="COOK ISLANDS">COOK ISLANDS</option>
                            <option value="COSTA RICAN">COSTA RICAN</option>
                            <option value="CROATIAN">CROATIAN</option>
                            <option value="CUBAN">CUBAN</option>
                            <option value="CYPRIOT">CYPRIOT</option>
                            <option value="CZECH">CZECH</option>
                            <option value="CZECHOSLOVAK">CZECHOSLOVAK</option>
                            <option value="DANISH">DANISH</option>
                            <option value="DEMOCRATIC REP OF THE CONGO">DEMOCRATIC REP OF THE CONGO</option>
                            <option value="DJIBOUTI">DJIBOUTI</option>
                            <option value="DOMINICA">DOMINICA</option>
                            <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                            <option value="DUTCH">DUTCH</option>
                            <option value="EAST TIMORESE">EAST TIMORESE</option>
                            <option value="ECUADORIAN">ECUADORIAN</option>
                            <option value="EGYPTIAN">EGYPTIAN</option>
                            <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                            <option value="ERITREA">ERITREA</option>
                            <option value="ESTONIAN">ESTONIAN</option>
                            <option value="ETHIOPIAN">ETHIOPIAN</option>
                            <option value="FAEROE ISLANDS">FAEROE ISLANDS</option>
                            <option value="FALKLAND IS">FALKLAND IS</option>
                            <option value="FIJIAN">FIJIAN</option>
                            <option value="FILIPINO">FILIPINO</option>
                            <option value="FINNISH">FINNISH</option>
                            <option value="FRENCH">FRENCH</option>
                            <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                            <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                            <option value="FRENCH SOUTHERN TERR">FRENCH SOUTHERN TERR</option>
                            <option value="GABON">GABON</option>
                            <option value="GAMBIAN">GAMBIAN</option>
                            <option value="GEORGIA">GEORGIA</option>
                            <option value="GERMAN">GERMAN</option>
                            <option value="GHANAIAN">GHANAIAN</option>
                            <option value="GIBRALTAR">GIBRALTAR</option>
                            <option value="GREEK">GREEK</option>
                            <option value="GREENLAND">GREENLAND</option>
                            <option value="GRENADIAN">GRENADIAN</option>
                            <option value="GUADELOUPE">GUADELOUPE</option>
                            <option value="GUAM">GUAM</option>
                            <option value="GUATEMALA">GUATEMALA</option>
                            <option value="GUINEA">GUINEA</option>
                            <option value="GUINES BISSAU">GUINES BISSAU</option>
                            <option value="GUYANA">GUYANA</option>
                            <option value="HAITIAN">HAITIAN</option>
                            <option value="HEARD MCDONALD ISLND">HEARD MCDONALD ISLND</option>
                            <option value="HONDURAN">HONDURAN</option>
                            <option value="HONG KONG">HONG KONG</option>
                            <option value="HUNGARIAN">HUNGARIAN</option>
                            <option value="ICELAND">ICELAND</option>
                            <option selected="selected" value="INDIAN">INDIAN</option>
                            <option value="INDONESIAN">INDONESIAN</option>
                            <option value="IRANIAN">IRANIAN</option>
                            <option value="IRAQI">IRAQI</option>
                            <option value="IRISH">IRISH</option>
                            <option value="ISLE OF MAN">ISLE OF MAN</option>
                            <option value="ISRAELI">ISRAELI</option>
                            <option value="ITALIAN">ITALIAN</option>
                            <option value="IVORY COAST">IVORY COAST</option>
                            <option value="JAMAICAN">JAMAICAN</option>
                            <option value="JAPANESE">JAPANESE</option>
                            <option value="JORDANIAN">JORDANIAN</option>
                            <option value="KAMPUCHEAN">KAMPUCHEAN</option>
                            <option value="KAZAKH">KAZAKH</option>
                            <option value="KENYAN">KENYAN</option>
                            <option value="KIRGHIZ">KIRGHIZ</option>
                            <option value="KIRIBATI">KIRIBATI</option>
                            <option value="KOREAN, NORTH">KOREAN, NORTH</option>
                            <option value="KOREAN, SOUTH">KOREAN, SOUTH</option>
                            <option value="KOSOVAR">KOSOVAR</option>
                            <option value="KUWAITI">KUWAITI</option>
                            <option value="KYRGHIS">KYRGHIS</option>
                            <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                            <option value="LAOTIAN">LAOTIAN</option>
                            <option value="LATVIAN">LATVIAN</option>
                            <option value="LEBANESE">LEBANESE</option>
                            <option value="LESOTHO">LESOTHO</option>
                            <option value="LIBERIAN">LIBERIAN</option>
                            <option value="LIBYAN">LIBYAN</option>
                            <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                            <option value="LITHUANIA">LITHUANIA</option>
                            <option value="LUXEMBOURG">LUXEMBOURG</option>
                            <option value="MACAO">MACAO</option>
                            <option value="MACEDONIA">MACEDONIA</option>
                            <option value="MADAGASCAR">MADAGASCAR</option>
                            <option value="MALAWI">MALAWI</option>
                            <option value="MALAYSIAN">MALAYSIAN</option>
                            <option value="MALDIVIAN">MALDIVIAN</option>
                            <option value="MALI">MALI</option>
                            <option value="MALTESE">MALTESE</option>
                            <option value="MARSHELLES">MARSHELLES</option>
                            <option value="MARTINIQUE">MARTINIQUE</option>
                            <option value="MAURITANEAN">MAURITANEAN</option>
                            <option value="MAURITIAN">MAURITIAN</option>
                            <option value="MEXICAN">MEXICAN</option>
                            <option value="MICRONESIAN">MICRONESIAN</option>
                            <option value="MOLDOVIAN">MOLDOVIAN</option>
                            <option value="MONACO">MONACO</option>
                            <option value="MONGOLIAN">MONGOLIAN</option>
                            <option value="MONTENEGRIN">MONTENEGRIN</option>
                            <option value="MONTSERRAT">MONTSERRAT</option>
                            <option value="MOROCCAN">MOROCCAN</option>
                            <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                            <option value="MYANMAR">MYANMAR</option>
                            <option value="NAMIBIA">NAMIBIA</option>
                            <option value="NAURUAN">NAURUAN</option>
                            <option value="NEPALESE">NEPALESE</option>
                            <option value="NETHERLANDS">NETHERLANDS</option>
                            <option value="NETHERLANDS ANTIL.">NETHERLANDS ANTIL.</option>
                            <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                            <option value="NEW ZEALANDER">NEW ZEALANDER</option>
                            <option value="NICARAGUAN">NICARAGUAN</option>
                            <option value="NIGER">NIGER</option>
                            <option value="NIGERIAN">NIGERIAN</option>
                            <option value="NIUE ISLAND">NIUE ISLAND</option>
                            <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                            <option value="NORTHERN MARIANA ISL">NORTHERN MARIANA ISL</option>
                            <option value="NORWEGIAN">NORWEGIAN</option>
                            <option value="OC CTRL STH AMERICA">OC CTRL STH AMERICA</option>
                            <option value="OC IN OTHER AFRICA">OC IN OTHER AFRICA</option>
                            <option value="OC IN S E ASIA">OC IN S E ASIA</option>
                            <option value="OC NORTH AMERICA">OC NORTH AMERICA</option>
                            <option value="OC OCEANIA">OC OCEANIA</option>
                            <option value="OMAN">OMAN</option>
                            <option value="OTHERS">OTHERS</option>
                            <option value="PACIFIC IS TRUST T">PACIFIC IS TRUST T</option>
                            <option value="PAKISTANI">PAKISTANI</option>
                            <option value="PALAU">PALAU</option>
                            <option value="PALESTINIAN">PALESTINIAN</option>
                            <option value="PANAMANIAN">PANAMANIAN</option>
                            <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                            <option value="PARAGUAY">PARAGUAY</option>
                            <option value="PERUVIAN">PERUVIAN</option>
                            <option value="PITCAIRN">PITCAIRN</option>
                            <option value="POLISH">POLISH</option>
                            <option value="PORTUGUESE">PORTUGUESE</option>
                            <option value="PUERTO RICAN">PUERTO RICAN</option>
                            <option value="QATAR">QATAR</option>
                            <option value="REUNION">REUNION</option>
                            <option value="ROMANIAN">ROMANIAN</option>
                            <option value="RUSSIAN">RUSSIAN</option>
                            <option value="RWANDA">RWANDA</option>
                            <option value="SAINT KITTS NEVIS">SAINT KITTS NEVIS</option>
                            <option value="SALVADORAN">SALVADORAN</option>
                            <option value="SAMOAN">SAMOAN</option>
                            <option value="SAN MARINO">SAN MARINO</option>
                            <option value="SAO TOME PRINCI">SAO TOME PRINCI</option>
                            <option value="SAUDI ARABIAN">SAUDI ARABIAN</option>
                            <option value="SENEGALESE">SENEGALESE</option>
                            <option value="SERBIAN">SERBIAN</option>
                            <option value="SEYCHELLES">SEYCHELLES</option>
                            <option value="SIERRA LEONE">SIERRA LEONE</option>
                            <option value="SINGAPORE CITIZEN">SINGAPORE CITIZEN</option>
                            <option value="SLOVAK">SLOVAK</option>
                            <option value="SLOVENIAN">SLOVENIAN</option>
                            <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                            <option value="SOMALI">SOMALI</option>
                            <option value="SOUTH AFRICAN">SOUTH AFRICAN</option>
                            <option value="SPANISH">SPANISH</option>
                            <option value="SRI LANKAN">SRI LANKAN</option>
                            <option value="ST HELENA">ST HELENA</option>
                            <option value="ST LUCIA">ST LUCIA</option>
                            <option value="ST PIERRE MIQUELON">ST PIERRE MIQUELON</option>
                            <option value="ST VINCENT">ST VINCENT</option>
                            <option value="SUDANESE">SUDANESE</option>
                            <option value="SURINAME">SURINAME</option>
                            <option value="SVALBARD JAN MAYEN">SVALBARD JAN MAYEN</option>
                            <option value="SWAZI">SWAZI</option>
                            <option value="SWEDISH">SWEDISH</option>
                            <option value="SWISS">SWISS</option>
                            <option value="SYRIAN">SYRIAN</option>
                            <option value="TADZHIK">TADZHIK</option>
                            <option value="TAIWANESE">TAIWANESE</option>
                            <option value="TAJIKISTANI">TAJIKISTANI</option>
                            <option value="TANZANIAN">TANZANIAN</option>
                            <option value="THAI">THAI</option>
                            <option value="TIMORENSE">TIMORENSE</option>
                            <option value="TOGO">TOGO</option>
                            <option value="TOKELAU ISLANDS">TOKELAU ISLANDS</option>
                            <option value="TONGA">TONGA</option>
                            <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                            <option value="TUNISIA">TUNISIA</option>
                            <option value="TURK">TURK</option>
                            <option value="TURKMEN">TURKMEN</option>
                            <option value="TURKS AND CAICOS IS">TURKS AND CAICOS IS</option>
                            <option value="TUVALU">TUVALU</option>
                            <option value="U S MINOR ISLANDS">U S MINOR ISLANDS</option>
                            <option value="UGANDIAN">UGANDIAN</option>
                            <option value="UKRAINIAN">UKRAINIAN</option>
                            <option value="UNITED ARAB EM.">UNITED ARAB EM.</option>
                            <option value="UNKNOWN">UNKNOWN</option>
                            <option value="UPPER VOLTA">UPPER VOLTA</option>
                            <option value="URUGUAY">URUGUAY</option>
                            <option value="UZBEK">UZBEK</option>
                            <option value="VANUATU">VANUATU</option>
                            <option value="VATICAN CITY STATE">VATICAN CITY STATE</option>
                            <option value="VENEZUELAN">VENEZUELAN</option>
                            <option value="VIETNAMESE">VIETNAMESE</option>
                            <option value="VIRGIN ISLANDS US">VIRGIN ISLANDS US</option>
                            <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                            <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                            <option value="YEMEN ARAB REP">YEMEN ARAB REP</option>
                            <option value="YEMEN, SOUTH">YEMEN, SOUTH</option>
                            <option value="YEMENI">YEMENI</option>
                            <option value="YUGOSLAV">YUGOSLAV</option>
                            <option value="ZAIRAN">ZAIRAN</option>
                            <option value="ZAMBIAN">ZAMBIAN</option>
                            <option value="ZIMBABWEAN">ZIMBABWEAN</option>
                        </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Race</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option value="AFGHAN">AFGHAN</option>
                            <option value="ALBANIAN">ALBANIAN</option>
                            <option value="ALGERIAN">ALGERIAN</option>
                            <option value="AMERICAN">AMERICAN</option>
                            <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                            <option value="ANDORRAN">ANDORRAN</option>
                            <option value="ANGOLAN">ANGOLAN</option>
                            <option value="ANGUILLA">ANGUILLA</option>
                            <option value="ANTARCTICA">ANTARCTICA</option>
                            <option value="ANTIGUA">ANTIGUA</option>
                            <option value="ARGENTINIAN">ARGENTINIAN</option>
                            <option value="ARMENIAN">ARMENIAN</option>
                            <option value="ARUBA">ARUBA</option>
                            <option value="AUSTRALIAN">AUSTRALIAN</option>
                            <option value="AUSTRIAN">AUSTRIAN</option>
                            <option value="AZERBAIJANI">AZERBAIJANI</option>
                            <option value="BAHAMAS">BAHAMAS</option>
                            <option value="BAHRAINI">BAHRAINI</option>
                            <option value="BANGLADESHI">BANGLADESHI</option>
                            <option value="BARBADOS">BARBADOS</option>
                            <option value="BELARUSSIAN">BELARUSSIAN</option>
                            <option value="BELGIAN">BELGIAN</option>
                            <option value="BELIZE">BELIZE</option>
                            <option value="BENIN">BENIN</option>
                            <option value="BERMUDAN">BERMUDAN</option>
                            <option value="BHUTAN">BHUTAN</option>
                            <option value="BOLIVIAN">BOLIVIAN</option>
                            <option value="BOSNIAN">BOSNIAN</option>
                            <option value="BOTSWANA">BOTSWANA</option>
                            <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                            <option value="BR NAT. OVERSEAS">BR NAT. OVERSEAS</option>
                            <option value="BR OVERSEAS CIT.">BR OVERSEAS CIT.</option>
                            <option value="BR PROTECTED PERS.">BR PROTECTED PERS.</option>
                            <option value="BRAZILIAN">BRAZILIAN</option>
                            <option value="BRITISH">BRITISH</option>
                            <option value="BRITISH DEPENDENT TERR CITIZEN">BRITISH DEPENDENT TERR CITIZEN</option>
                            <option value="BRITISH INDIAN OCEAN">BRITISH INDIAN OCEAN</option>
                            <option value="BRITISH SUBJECT">BRITISH SUBJECT</option>
                            <option value="BRITISH VIRGIN ISLND">BRITISH VIRGIN ISLND</option>
                            <option value="BRUNEIAN">BRUNEIAN</option>
                            <option value="BULGARIAN">BULGARIAN</option>
                            <option value="BURKINA FASO">BURKINA FASO</option>
                            <option value="BURUNDI">BURUNDI</option>
                            <option value="CAMBODIAN">CAMBODIAN</option>
                            <option value="CAMEROON">CAMEROON</option>
                            <option value="CANADIAN">CANADIAN</option>
                            <option value="CAPE VERDE">CAPE VERDE</option>
                            <option value="CAYMANESE">CAYMANESE</option>
                            <option value="CENTRAL AFRICAN REP">CENTRAL AFRICAN REP</option>
                            <option value="CHADIAN">CHADIAN</option>
                            <option value="CHILEAN">CHILEAN</option>
                            <option value="CHINESE">CHINESE</option>
                            <option value="CHRISTMAS ISLANDS">CHRISTMAS ISLANDS</option>
                            <option value="COCOS KEELING ISLAND">COCOS KEELING ISLAND</option>
                            <option value="COLOMBIAN">COLOMBIAN</option>
                            <option value="COMOROS">COMOROS</option>
                            <option value="CONGO">CONGO</option>
                            <option value="COOK ISLANDS">COOK ISLANDS</option>
                            <option value="COSTA RICAN">COSTA RICAN</option>
                            <option value="CROATIAN">CROATIAN</option>
                            <option value="CUBAN">CUBAN</option>
                            <option value="CYPRIOT">CYPRIOT</option>
                            <option value="CZECH">CZECH</option>
                            <option value="CZECHOSLOVAK">CZECHOSLOVAK</option>
                            <option value="DANISH">DANISH</option>
                            <option value="DEMOCRATIC REP OF THE CONGO">DEMOCRATIC REP OF THE CONGO</option>
                            <option value="DJIBOUTI">DJIBOUTI</option>
                            <option value="DOMINICA">DOMINICA</option>
                            <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                            <option value="DUTCH">DUTCH</option>
                            <option value="EAST TIMORESE">EAST TIMORESE</option>
                            <option value="ECUADORIAN">ECUADORIAN</option>
                            <option value="EGYPTIAN">EGYPTIAN</option>
                            <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                            <option value="ERITREA">ERITREA</option>
                            <option value="ESTONIAN">ESTONIAN</option>
                            <option value="ETHIOPIAN">ETHIOPIAN</option>
                            <option value="FAEROE ISLANDS">FAEROE ISLANDS</option>
                            <option value="FALKLAND IS">FALKLAND IS</option>
                            <option value="FIJIAN">FIJIAN</option>
                            <option value="FILIPINO">FILIPINO</option>
                            <option value="FINNISH">FINNISH</option>
                            <option value="FRENCH">FRENCH</option>
                            <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                            <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                            <option value="FRENCH SOUTHERN TERR">FRENCH SOUTHERN TERR</option>
                            <option value="GABON">GABON</option>
                            <option value="GAMBIAN">GAMBIAN</option>
                            <option value="GEORGIA">GEORGIA</option>
                            <option value="GERMAN">GERMAN</option>
                            <option value="GHANAIAN">GHANAIAN</option>
                            <option value="GIBRALTAR">GIBRALTAR</option>
                            <option value="GREEK">GREEK</option>
                            <option value="GREENLAND">GREENLAND</option>
                            <option value="GRENADIAN">GRENADIAN</option>
                            <option value="GUADELOUPE">GUADELOUPE</option>
                            <option value="GUAM">GUAM</option>
                            <option value="GUATEMALA">GUATEMALA</option>
                            <option value="GUINEA">GUINEA</option>
                            <option value="GUINES BISSAU">GUINES BISSAU</option>
                            <option value="GUYANA">GUYANA</option>
                            <option value="HAITIAN">HAITIAN</option>
                            <option value="HEARD MCDONALD ISLND">HEARD MCDONALD ISLND</option>
                            <option value="HONDURAN">HONDURAN</option>
                            <option value="HONG KONG">HONG KONG</option>
                            <option value="HUNGARIAN">HUNGARIAN</option>
                            <option value="ICELAND">ICELAND</option>
                            <option selected="selected" value="INDIAN">INDIAN</option>
                            <option value="INDONESIAN">INDONESIAN</option>
                            <option value="IRANIAN">IRANIAN</option>
                            <option value="IRAQI">IRAQI</option>
                            <option value="IRISH">IRISH</option>
                            <option value="ISLE OF MAN">ISLE OF MAN</option>
                            <option value="ISRAELI">ISRAELI</option>
                            <option value="ITALIAN">ITALIAN</option>
                            <option value="IVORY COAST">IVORY COAST</option>
                            <option value="JAMAICAN">JAMAICAN</option>
                            <option value="JAPANESE">JAPANESE</option>
                            <option value="JORDANIAN">JORDANIAN</option>
                            <option value="KAMPUCHEAN">KAMPUCHEAN</option>
                            <option value="KAZAKH">KAZAKH</option>
                            <option value="KENYAN">KENYAN</option>
                            <option value="KIRGHIZ">KIRGHIZ</option>
                            <option value="KIRIBATI">KIRIBATI</option>
                            <option value="KOREAN, NORTH">KOREAN, NORTH</option>
                            <option value="KOREAN, SOUTH">KOREAN, SOUTH</option>
                            <option value="KOSOVAR">KOSOVAR</option>
                            <option value="KUWAITI">KUWAITI</option>
                            <option value="KYRGHIS">KYRGHIS</option>
                            <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                            <option value="LAOTIAN">LAOTIAN</option>
                            <option value="LATVIAN">LATVIAN</option>
                            <option value="LEBANESE">LEBANESE</option>
                            <option value="LESOTHO">LESOTHO</option>
                            <option value="LIBERIAN">LIBERIAN</option>
                            <option value="LIBYAN">LIBYAN</option>
                            <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                            <option value="LITHUANIA">LITHUANIA</option>
                            <option value="LUXEMBOURG">LUXEMBOURG</option>
                            <option value="MACAO">MACAO</option>
                            <option value="MACEDONIA">MACEDONIA</option>
                            <option value="MADAGASCAR">MADAGASCAR</option>
                            <option value="MALAWI">MALAWI</option>
                            <option value="MALAYSIAN">MALAYSIAN</option>
                            <option value="MALDIVIAN">MALDIVIAN</option>
                            <option value="MALI">MALI</option>
                            <option value="MALTESE">MALTESE</option>
                            <option value="MARSHELLES">MARSHELLES</option>
                            <option value="MARTINIQUE">MARTINIQUE</option>
                            <option value="MAURITANEAN">MAURITANEAN</option>
                            <option value="MAURITIAN">MAURITIAN</option>
                            <option value="MEXICAN">MEXICAN</option>
                            <option value="MICRONESIAN">MICRONESIAN</option>
                            <option value="MOLDOVIAN">MOLDOVIAN</option>
                            <option value="MONACO">MONACO</option>
                            <option value="MONGOLIAN">MONGOLIAN</option>
                            <option value="MONTENEGRIN">MONTENEGRIN</option>
                            <option value="MONTSERRAT">MONTSERRAT</option>
                            <option value="MOROCCAN">MOROCCAN</option>
                            <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                            <option value="MYANMAR">MYANMAR</option>
                            <option value="NAMIBIA">NAMIBIA</option>
                            <option value="NAURUAN">NAURUAN</option>
                            <option value="NEPALESE">NEPALESE</option>
                            <option value="NETHERLANDS">NETHERLANDS</option>
                            <option value="NETHERLANDS ANTIL.">NETHERLANDS ANTIL.</option>
                            <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                            <option value="NEW ZEALANDER">NEW ZEALANDER</option>
                            <option value="NICARAGUAN">NICARAGUAN</option>
                            <option value="NIGER">NIGER</option>
                            <option value="NIGERIAN">NIGERIAN</option>
                            <option value="NIUE ISLAND">NIUE ISLAND</option>
                            <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                            <option value="NORTHERN MARIANA ISL">NORTHERN MARIANA ISL</option>
                            <option value="NORWEGIAN">NORWEGIAN</option>
                            <option value="OC CTRL STH AMERICA">OC CTRL STH AMERICA</option>
                            <option value="OC IN OTHER AFRICA">OC IN OTHER AFRICA</option>
                            <option value="OC IN S E ASIA">OC IN S E ASIA</option>
                            <option value="OC NORTH AMERICA">OC NORTH AMERICA</option>
                            <option value="OC OCEANIA">OC OCEANIA</option>
                            <option value="OMAN">OMAN</option>
                            <option value="OTHERS">OTHERS</option>
                            <option value="PACIFIC IS TRUST T">PACIFIC IS TRUST T</option>
                            <option value="PAKISTANI">PAKISTANI</option>
                            <option value="PALAU">PALAU</option>
                            <option value="PALESTINIAN">PALESTINIAN</option>
                            <option value="PANAMANIAN">PANAMANIAN</option>
                            <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                            <option value="PARAGUAY">PARAGUAY</option>
                            <option value="PERUVIAN">PERUVIAN</option>
                            <option value="PITCAIRN">PITCAIRN</option>
                            <option value="POLISH">POLISH</option>
                            <option value="PORTUGUESE">PORTUGUESE</option>
                            <option value="PUERTO RICAN">PUERTO RICAN</option>
                            <option value="QATAR">QATAR</option>
                            <option value="REUNION">REUNION</option>
                            <option value="ROMANIAN">ROMANIAN</option>
                            <option value="RUSSIAN">RUSSIAN</option>
                            <option value="RWANDA">RWANDA</option>
                            <option value="SAINT KITTS NEVIS">SAINT KITTS NEVIS</option>
                            <option value="SALVADORAN">SALVADORAN</option>
                            <option value="SAMOAN">SAMOAN</option>
                            <option value="SAN MARINO">SAN MARINO</option>
                            <option value="SAO TOME PRINCI">SAO TOME PRINCI</option>
                            <option value="SAUDI ARABIAN">SAUDI ARABIAN</option>
                            <option value="SENEGALESE">SENEGALESE</option>
                            <option value="SERBIAN">SERBIAN</option>
                            <option value="SEYCHELLES">SEYCHELLES</option>
                            <option value="SIERRA LEONE">SIERRA LEONE</option>
                            <option value="SINGAPORE CITIZEN">SINGAPORE CITIZEN</option>
                            <option value="SLOVAK">SLOVAK</option>
                            <option value="SLOVENIAN">SLOVENIAN</option>
                            <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                            <option value="SOMALI">SOMALI</option>
                            <option value="SOUTH AFRICAN">SOUTH AFRICAN</option>
                            <option value="SPANISH">SPANISH</option>
                            <option value="SRI LANKAN">SRI LANKAN</option>
                            <option value="ST HELENA">ST HELENA</option>
                            <option value="ST LUCIA">ST LUCIA</option>
                            <option value="ST PIERRE MIQUELON">ST PIERRE MIQUELON</option>
                            <option value="ST VINCENT">ST VINCENT</option>
                            <option value="SUDANESE">SUDANESE</option>
                            <option value="SURINAME">SURINAME</option>
                            <option value="SVALBARD JAN MAYEN">SVALBARD JAN MAYEN</option>
                            <option value="SWAZI">SWAZI</option>
                            <option value="SWEDISH">SWEDISH</option>
                            <option value="SWISS">SWISS</option>
                            <option value="SYRIAN">SYRIAN</option>
                            <option value="TADZHIK">TADZHIK</option>
                            <option value="TAIWANESE">TAIWANESE</option>
                            <option value="TAJIKISTANI">TAJIKISTANI</option>
                            <option value="TANZANIAN">TANZANIAN</option>
                            <option value="THAI">THAI</option>
                            <option value="TIMORENSE">TIMORENSE</option>
                            <option value="TOGO">TOGO</option>
                            <option value="TOKELAU ISLANDS">TOKELAU ISLANDS</option>
                            <option value="TONGA">TONGA</option>
                            <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                            <option value="TUNISIA">TUNISIA</option>
                            <option value="TURK">TURK</option>
                            <option value="TURKMEN">TURKMEN</option>
                            <option value="TURKS AND CAICOS IS">TURKS AND CAICOS IS</option>
                            <option value="TUVALU">TUVALU</option>
                            <option value="U S MINOR ISLANDS">U S MINOR ISLANDS</option>
                            <option value="UGANDIAN">UGANDIAN</option>
                            <option value="UKRAINIAN">UKRAINIAN</option>
                            <option value="UNITED ARAB EM.">UNITED ARAB EM.</option>
                            <option value="UNKNOWN">UNKNOWN</option>
                            <option value="UPPER VOLTA">UPPER VOLTA</option>
                            <option value="URUGUAY">URUGUAY</option>
                            <option value="UZBEK">UZBEK</option>
                            <option value="VANUATU">VANUATU</option>
                            <option value="VATICAN CITY STATE">VATICAN CITY STATE</option>
                            <option value="VENEZUELAN">VENEZUELAN</option>
                            <option value="VIETNAMESE">VIETNAMESE</option>
                            <option value="VIRGIN ISLANDS US">VIRGIN ISLANDS US</option>
                            <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                            <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                            <option value="YEMEN ARAB REP">YEMEN ARAB REP</option>
                            <option value="YEMEN, SOUTH">YEMEN, SOUTH</option>
                            <option value="YEMENI">YEMENI</option>
                            <option value="YUGOSLAV">YUGOSLAV</option>
                            <option value="ZAIRAN">ZAIRAN</option>
                            <option value="ZAMBIAN">ZAMBIAN</option>
                            <option value="ZIMBABWEAN">ZIMBABWEAN</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Religion</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option value="BUDDHIST">BUDDHIST</option>
                            <option value="CHRISTIAN">CHRISTIAN</option>
                            <option selected="selected" value="HINDU">HINDU</option>
                            <option value="MUSLIM">MUSLIM</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Designation</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option selected="selected" value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Supervisor">Supervisor</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Team</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option selected="selected" value="Team A">Team A</option>
                            <option value="Team B">Team B</option>
                            <option value="Team C">Team C</option>
                            <option value="Team D">Team D</option>
                        </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <Label>Project manager</Label>
                        <FormGroup check>
                          <Input name="radio1" type="radio" />{' '}
                          <Label check>Yes</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input name="radio1" type="radio" />{' '}
                            <Label check> No </Label>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <Label>Admin Staff</Label>
                        <FormGroup check>
                          <Input name="radio1" type="radio" />{' '}
                          <Label check>Yes</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input name="radio1" type="radio" />{' '}
                            <Label check> No </Label>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Employee Type</Label>
                        <Input type="select">
                            <option value="">Please Select</option>
                            <option selected="selected" value="Employee">Please Select</option>
                            <option value="In house">In house</option>
                            <option value="Others">Others</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
              </Form>

  <ComponentCard title="More Details">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Login Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Pass Type
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Educational Qualification
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Contact Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '5' ? 'active' : ''}
              onClick={() => {
                toggle('5');
              }}
            >
              Emergency Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '6' ? 'active' : ''}
              onClick={() => {
                toggle('6');
              }}
            >
                Attachment Portals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '7' ? 'active' : ''}
              onClick={() => {
                toggle('7');
              }}
            >
              Linked Portals
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
            <Col md="3">
                <FormGroup>
                <Label>Login Email</Label>
                <Input type="email"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Password</Label>
                <Input type="password"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>User Group</Label>
                <Input type="select">
                    <option value="2">Tender</option>
                    <option value="3">HR</option>
                    <option value="4">Admin and Purchase</option>
                    <option value="5">Tender and Project</option>
                    <option value="6">Projects</option>
                    <option value="7">Accounts</option>
                    <option value="8">Super Admin</option>
                    <option value="9">Testing Universal</option>
                </Input>

                </FormGroup>
            </Col>
           
            <Col md="3">
            <Label>Published</Label>
                <FormGroup check>
                    <Input name="radio1" type="radio" />{' '}
                    <Label check>Yes</Label>
                </FormGroup>
                <FormGroup check>
                    <Input name="radio1" type="radio" />{' '}
                    <Label check> No </Label>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
            <Col md="6">
                <FormGroup>
                <Label>Pass Type *</Label>
                <Input type="select">
                    <option value="">Please Select</option>
                    <option selected="selected" value="Citizen">Citizen</option>
                    <option value="PR">PR</option>
                    <option value="EP">EP</option>
                    <option value="SP">SP</option>
                    <option value="WP">WP</option>
                    <option value="DP">DP</option>
                </Input>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                <Label>NRIC No *</Label>
                <Input type="text"/>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
                <Row>
                    <Col md="4">
                        <FormGroup>
                        <Label>Qualification 1</Label>
                        <Input type="select">
                            <option value="Archive" selected="selected">Please Select</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Degree</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Year of completion</Label>
                        <Input type="date"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormGroup>
                        <Label>Qualification 1</Label>
                        <Input type="select">
                            <option value="Archive" selected="selected">Please Select</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Degree</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Year of completion</Label>
                        <Input type="date"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormGroup>
                        <Label>Qualification 1</Label>
                        <Input type="select">
                            <option value="Archive" selected="selected">Please Select</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Degree</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                        <Label>Year of completion</Label>
                        <Input type="date"/>
                        </FormGroup>
                    </Col>
                </Row>
          </TabPane>
          <TabPane tabId="4">
          <ComponentCard title="Contact Information (For Citizen)">
          <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Address 1</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Address 2</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Postal Code</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Country</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>HP/Mobile No.</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Alternate Contact number</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Email</Label>
                        <Input type="email"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label></Label>
                        
                        </FormGroup>
                    </Col>
                </Row>
          </ComponentCard>
          <ComponentCard title="Contact Information (Overseas, For Non-Citizen Or Permanent Resident)">
          <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Address 1</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Address 2</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Postal Code</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Country</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>HP/Mobile No.</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Alternate Contact number</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Email</Label>
                        <Input type="email"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label></Label>
                        
                        </FormGroup>
                    </Col>
                </Row>
          </ComponentCard>
          </TabPane>
          <TabPane tabId="5">
                <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Name</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Phone 1</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Phone 2</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Address</Label>
                        <Input type="text"/>
                        </FormGroup>
                    </Col>
                </Row>
          </TabPane>
          <TabPane tabId="6">
          <Row>
                <Col xs="12" md="3">
                    <ComponentCard title="Picture">
                        <Button color="primary" onClick={toggle1.bind(null)}>
                           Add Picture
                        </Button>
                        <Modal isOpen={modal1} toggle={toggle1.bind(null)}>
                            <ModalHeader toggle={toggle1.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                            <FormGroup>
                                <Label htmlFor="exampleFile">Select Files</Label>
                                <Input type="file" placeholder="" />
                            </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle2.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                <Col xs="12" md="3">
                    <ComponentCard title="Work Permit">
                        <Button color="primary" onClick={toggle2.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={modal2} toggle={toggle2.bind(null)}>
                            <ModalHeader toggle={toggle2.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle2.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                <Col xs="12" md="3">
                    <ComponentCard title="WSQ">
                        <Button color="primary" onClick={toggle3.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={modal3} toggle={toggle3.bind(null)}>
                            <ModalHeader toggle={toggle3.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle2.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                <Col xs="12" md="3">
                    <ComponentCard title="Digital Sign">
                        <Button color="primary" onClick={toggle4.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={modal4} toggle={toggle4.bind(null)}>
                            <ModalHeader toggle={toggle4.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle2.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                </Row>
          </TabPane>
          <TabPane tabId="7">
               
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  )
};

export default EmployeeDetailsData;