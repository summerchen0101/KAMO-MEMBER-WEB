import Dashboard from '@/components/Dashboard'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import { Box, Flex, List, ListItem, Stack, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'

const ProfilePage: React.FC = () => {
  return (
    <Dashboard>
      <main className="user-main">
        <Flex className="laout">
          <MemberMenu />

          <Stack
            className="user-centerContent"
            direction={['column']}
            spacing="20px"
          >
            <Flex w="full">
              <Box className="vip-levelContainer">
                <Box className="vip-num">0</Box>
              </Box>
              <Flex direction="column" ml="16px" justifyContent="center">
                <Text
                  color="brand.500"
                  fontSize="18px"
                  fontWeight="bold"
                  mb="20px"
                >
                  当前等级 : VIP 0
                </Text>
                <Flex w="full">
                  <Flex mr="20px" className="chargeAndFLow" alignItems="center">
                    <Image
                      src="/img/center/ic-vipCharge.png"
                      w="45px"
                      h="45px"
                    ></Image>
                    <Flex
                      direction="column"
                      color="gray.600"
                      fontSize="20px"
                      fontWeight="bold"
                      ml="20px"
                    >
                      0.00
                      <Text color="gray.600" fontSize="14px">
                        累计存款
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mr="20px" className="chargeAndFLow" alignItems="center">
                    <Image
                      src="/img/center/ic-vipFLow.png"
                      w="45px"
                      h="45px"
                    ></Image>
                    <Flex
                      direction="column"
                      color="gray.600"
                      fontSize="20px"
                      fontWeight="bold"
                      ml="20px"
                    >
                      0.00
                      <Text color="gray.600" fontSize="14px">
                        累计流水
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <List className="currGrade">
              <ListItem className="active">
                <i>VIP0</i>
              </ListItem>
              <ListItem>
                <i>VIP1</i>
              </ListItem>
              <ListItem>
                <i>VIP2</i>
              </ListItem>
              <ListItem>
                <i>VIP3</i>
              </ListItem>
              <ListItem>
                <i>VIP4</i>
              </ListItem>
              <ListItem>
                <i>VIP5</i>
              </ListItem>
              <ListItem>
                <i>VIP6</i>
              </ListItem>
              <ListItem>
                <i>VIP7</i>
              </ListItem>
              <ListItem>
                <i>VIP8</i>
              </ListItem>
              <ListItem>
                <i>VIP9</i>
              </ListItem>
              <ListItem>
                <i>VIP10</i>
              </ListItem>
              <Box className="process"></Box>
            </List>

            <Box className="nextGrade" fontSize="14px">
              <Text
                color="brand.500"
                mb="5px"
                fontSize="18px"
                fontWeight="bold"
              >
                距离下一等级：VIP1
              </Text>
              <Flex mb="5px">
                <Flex w="50%">
                  存款还需金额约:
                  <Text color="gray.700" ml="10px">
                    500.00
                  </Text>
                </Flex>

                <Flex W="50%">
                  流水还需金额约:
                  <Text color="gray.700" ml="10px">
                    3,000.00
                  </Text>
                </Flex>
              </Flex>
              <Text>
                当前累计存款和累计流水截止2021年03月02日09时54分（每日16点更新）
              </Text>
            </Box>

            <Box className="section-title color-blue">VIP0尊享</Box>
            <List className="currGradeEnjoy">
              <ListItem>
                <Box className="iconBox ic-depositCount"></Box>
                <Text>每日提款次数</Text>
                <Text>5</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-withdrawlAmount"></Box>
                <Text>每日提款额度</Text>
                <Text>200,000</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-upgrade"></Box>
                <Text>
                  升级礼金<br></br>(晋级自动发放)
                </Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-birthday "></Box>
                <Text>生日礼金</Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-redeEvelope"></Box>
                <Text>
                  每月红包<br></br>(1号和15号可领取)
                </Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-commission "></Box>
                <Text>最高返水</Text>
                <Text>0.08%</Text>
              </ListItem>
            </List>
            <Box className="section-title color-primary">VIP最高返水比例</Box>
            {/* <BasicTable columns={columns} data={data}/> */}

            <table className="vipDiscount">
              <tr>
                <th>VIP等级</th>
                <th>VIP0</th>
                <th>VIP1</th>
                <th>VIP2</th>
                <th>VIP3</th>
                <th>VIP4</th>
                <th>VIP5</th>
                <th>VIP6</th>
                <th>VIP7</th>
                <th>VIP8</th>
                <th>VIP9</th>
                <th>VIP10</th>
              </tr>
              <tr>
                <td>KAMO體育</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
              </tr>
            </table>
          </Stack>
        </Flex>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
